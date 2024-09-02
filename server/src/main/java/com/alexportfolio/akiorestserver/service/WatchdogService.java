package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.AkioRestServerApplication;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class WatchdogService {
    private final ParserService parserService;
    private final MoneyFlowService moneyService;
    private final MCLogService mcLogService;

    @Scheduled(fixedDelay=60, timeUnit = TimeUnit.SECONDS)
    void transactionsWatchDog(){
        try{
            parserService.run();
            parserService.checkMoneyCollected();
            // reset specified containers to 0 each 1st day of the month
            moneyService.resetCustomMoneyContainers();
            // log reset containers before applying expenses
            mcLogService.log(null);
            moneyService.applyDatedExpenses();
        } catch(Exception e){
            AkioRestServerApplication.restart();
        }
    }
}
