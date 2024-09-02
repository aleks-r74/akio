package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.ExpensesRepo;
import org.springframework.beans.factory.annotation.Autowired;

//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ExpensesServiceTest {
    @Autowired
    ExpensesRepo expensesRepo;
    //@Test
    void applyPercentBasedExpensesTest(){
       // ExpensesService expensesService = new ExpensesService(expensesRepo);
       // expensesService.applyPercentBasedExpenses(new MoneyFlowEnt("clients","terminal",new BigDecimal(300),"descr"));

    }
}
