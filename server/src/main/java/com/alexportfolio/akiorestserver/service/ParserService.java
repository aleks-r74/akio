package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.AkioRestServerApplication;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import com.alexportfolio.akiorestserver.webParser.Parser;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.openqa.selenium.WebDriverException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.TreeSet;

@AllArgsConstructor
@Component
public class ParserService {
    private final TransactionsService transactionsService;
    private final MoneyFlowService moneyService;
    private final Parser parser;
    private final MoneyContainerService moneyContainerService;
    private final MoneyFlowService moneyFlowService;
    private final MCLogService mcLogService;
    private static final Logger logger = LoggerFactory.getLogger(ParserService.class);
    private static Instant dataInconsistencyMarker;
    private static final int PARSE_STARTING_POINT = 30;


    void run(){
        try {
            var lastTransaction = transactionsService.findLastTransaction();
            LocalDate fromD = lastTransaction == null ?
                    LocalDate.now().minusDays(PARSE_STARTING_POINT) :
                    lastTransaction.getDate_time().toLocalDate();
            LocalDate toD = LocalDate.now();

            TreeSet<TransactionEnt> transactions = parser.getTransactions(fromD, toD);
            // exit if no transactions found
            if (!transactions.isEmpty()) {
                logger.info("found %d new transactions".formatted(transactions.size()));
                saveFoundTransactions(transactions);
            }
            checkMoneyCollected();
        }

        catch (RuntimeException e){
            logger.info("Exception during parsing: " + e.getClass().getName());
            logger.warn(e.getMessage());
            AkioRestServerApplication.getContext().close();
        }

    }

    @Transactional
    private void saveFoundTransactions(TreeSet<TransactionEnt> transactions){
        var moneyFlows = moneyService.transactionsToMoneyFlow(transactions);
        // save all transactions
        transactionsService.saveAll(transactions);
        // transfer money
        if(!moneyFlows.isEmpty())
            moneyService.transferMoney(moneyFlows);
    }

    void checkMoneyCollected(){
        int cashInTerminal = parser.getTotalCashFromTerminal().intValue();
        System.out.println("MoneyCollectionWatchDog at " + LocalTime.now());
        int previousTerminalBalance = moneyContainerService.findByContainerName("terminal").getBalance().intValue();

        if (cashInTerminal==0 && previousTerminalBalance!=0){
            mcLogService.log(LocalDateTime.now()); // system-initiated money transfers needs to be logged manually (logic of the aroundTransferMoney)
            moneyService.transferMoney(new MoneyFlowEnt("terminal","safe", new BigDecimal(previousTerminalBalance),"Automatic money collection"));
            mcLogService.log(LocalDateTime.now().plusSeconds(1));
        }
        // 2. Cash was collected from the terminal BUT for some reason there IS cash in the terminal
        else if ( cashInTerminal!=0  && (cashInTerminal < previousTerminalBalance)){
            if(dataInconsistencyMarker == null || Instant.now().isAfter(dataInconsistencyMarker.plus(1, ChronoUnit.DAYS))){
                dataInconsistencyMarker = Instant.now();
                moneyFlowService.save(
                        new MoneyFlowEnt(
                                LocalDateTime.now(),
                                "terminal",
                                "terminal",
                                new BigDecimal(0),
                                "WARNING. Data inconsistency found. Cash in the terminal was: %d, now: %d "
                                        .formatted(previousTerminalBalance, cashInTerminal),
                                0)

                );
            }
        }
    }
}
