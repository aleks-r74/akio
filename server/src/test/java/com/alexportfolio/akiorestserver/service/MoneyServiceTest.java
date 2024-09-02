package com.alexportfolio.akiorestserver.service;

import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;
import java.time.Month;


//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@SpringBootTest
public class MoneyServiceTest {
    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;

    @Autowired
    ExpensesService expensesService;
    @Autowired
    MoneyContainerService moneyContainerService;

    @Disabled
    //@Test
    void transactionsToMoneyFlowTest() throws InterruptedException {
        for(int m=1;m<=12;m++){
            Month month = Month.of(m);
            for(int day=1; day<=month.maxLength(); day++) {
                LocalDateTime date = LocalDateTime.of(2024,month,day,0,0,0);
                expensesService.getExpensesForDate(date);
            }
        }

    }
   // @Test
    void resetContainersTest() throws InterruptedException {
        moneyContainerService.resetContainer("terminal");
    }
}
