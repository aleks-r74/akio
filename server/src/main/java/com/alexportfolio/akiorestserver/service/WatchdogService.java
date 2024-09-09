package com.alexportfolio.akiorestserver.service;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class WatchdogService {
    private final ParserService parserService;
    private final MoneyFlowService moneyService;
    private final MCLogService mcLogService;
    private final DataSource dataSource;
    private static final Logger logger = LoggerFactory.getLogger(WatchdogService.class);

    @Scheduled(fixedDelay=60, timeUnit = TimeUnit.SECONDS)
    void transactionsWatchDog(){
        parserService.run();
        // reset specified containers to 0 each 1st day of the month
        moneyService.resetCustomMoneyContainers();
        // log reset containers before applying expenses
        mcLogService.log(null);
        moneyService.applyDatedExpenses();
    }

}
