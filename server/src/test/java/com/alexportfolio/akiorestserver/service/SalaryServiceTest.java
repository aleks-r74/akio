package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.MoneyFlowRepo;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.TreeSet;


//@SpringBootTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SalaryServiceTest {

    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;

    @Autowired
    TransactionsService transactionsService;
    @Autowired
    MoneyFlowService moneyFlowService;
    @Autowired
    SalaryService salaryService;
    @Autowired
    MoneyFlowRepo moneyFlowRepo;

    //@Test
    @Disabled
    void salaryCalcTest(){
        var start = LocalDateTime.of(2024,7,1,0,0,0);
        var end = LocalDateTime.of(2024,7,31,23,0,0);
        var transactions = transactionsService.findAllTransactionsBetween(start, end);
        var transactionSalary = salaryService.calculateSalary(transactions).getSalary().setScale(BigDecimal.ROUND_HALF_DOWN);

        var moneyFlowSalary = moneyFlowService.getMoneyFlowBetween(start, end).stream()
                .filter(t->{
                    return t.getSource().equals("wallet") && List.of("Ira","Olya").contains(t.getDest());
                })
                .map(MoneyFlowEnt::getAmount)
                .reduce(new BigDecimal("0"), BigDecimal::add).setScale(BigDecimal.ROUND_HALF_DOWN);
        assert moneyFlowSalary.equals(transactionSalary);
    }

    //@Test
    void writeNewMoneyFlow(){
        var start = LocalDateTime.of(2024,6,1,0,0,0);
        var end = LocalDateTime.of(2024,8,31,23,0,0);
        var transactions = transactionsService.findAllTransactionsBetween(start, end);

        var moneyFlows = moneyFlowService.transactionsToMoneyFlow(new TreeSet<>(transactions));
        moneyFlows.addAll(moneyFlowService.transactionsToSalaryMoneyFlows(transactions));
        moneyFlowRepo.saveAll(moneyFlows);
    }

}
