package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.MoneyFlowRepo;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.TreeSet;

//@SpringBootTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MoneyFlowServiceTest {
    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;

    @Autowired
    TransactionsService transactionsService;
    @Autowired
    SalaryService salaryService;
    @Autowired
    MoneyFlowService moneyFlowService;
    @Autowired
    SummaryService summaryService;
    @Autowired
    MoneyFlowRepo moneyFlowRepo;
    //@Test
    @Disabled
    void transactionsToMoneyFlowTest(){
        var transactions = transactionsService.findAllTransactionsBetween(LocalDateTime.of(2024,8,01,0,0,0),
                LocalDateTime.of(2024,8,31,23,0,0));
        var salaryCalc = salaryService.calculateSalary(transactions);
        TreeSet<MoneyFlowEnt> flows = moneyFlowService.transactionsToMoneyFlow(new TreeSet<>(transactions));
        System.out.println("Salary from transactions: " + salaryCalc.getSalary());
        BigDecimal flowSalary = flows.stream()
                .filter(f->{
                    return f.getSource().equals("wallet") && (f.getDest().equals("Olya") || f.getDest().equals("Ira"));
                })
                .map(MoneyFlowEnt::getAmount)
                .reduce(new BigDecimal("0"),BigDecimal::add);
        System.out.println("Salary from money flow: " + flowSalary);

    }

   //@Test
    @Disabled
    void updateMoneyFlows(){
        var transactions = transactionsService.findAllTransactionsBetween(LocalDateTime.of(2024,6,1,0,0,0),
                LocalDateTime.of(2024,8,31,23,0,0));
        TreeSet<MoneyFlowEnt> flows = moneyFlowService.transactionsToMoneyFlow(new TreeSet<>(transactions));
        moneyFlowService.transferMoney(flows);
    }

    //@Test
    void getLog(){
        var mfs = moneyFlowRepo.findAll();
        for(var mf: mfs){
            if(mf.getReceipt_num()!=null) continue;
            mf.setReceipt_num((int)((long)mf.getId()+1000000L));
        }
        moneyFlowRepo.saveAll(mfs);
    }
}
