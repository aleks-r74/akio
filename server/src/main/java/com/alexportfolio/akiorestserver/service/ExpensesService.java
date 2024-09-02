package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.ExpensesRepo;
import com.alexportfolio.akiorestserver.repository.entities.ExpenseEnt;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Component
@RequiredArgsConstructor
public class ExpensesService {
    private final ExpensesRepo expensesRepo;
    private final TransactionsService transactionsService;
    //time for the tax-expense
    private final LocalTime LAST_DAY_EXPENSE_TIME = LocalTime.of(21,0);
    public Set<MoneyFlowEnt> getPercentBasedExpenses(TransactionEnt transaction){
        // expenses are applied only for card payment type
        if(!transaction.getPayment_type().equals("card")) return Set.of();
        Set<MoneyFlowEnt> variableExpenses = new TreeSet<>();
        for(var expense : getAllExpenses()){
            if (expense.getDue_day()!=null) continue;
            var calculatedExpense = transaction.getMoney_posted().multiply(BigDecimal.valueOf(expense.getPercent()));

            // create moneyFlow based on the expense
            variableExpenses.add(
                    new MoneyFlowEnt(
                            transaction.getDate_time(),
                            expense.getSource(),
                            expense.getDest(),
                            calculatedExpense.setScale(2,RoundingMode.HALF_UP),
                            expense.getDescription(),
                            transaction.getReceipt_num()
                    )
            );
        }

        return variableExpenses;
    }

    // the last argument here is used to calculate taxes for specifc transactions
    public TreeSet<MoneyFlowEnt> getExpensesForDate(LocalDateTime thisDateExpenses, TransactionEnt... transactions){
        TreeSet<MoneyFlowEnt> expenses = new TreeSet<>();
        Integer lastDayOfMonth = thisDateExpenses.with(TemporalAdjusters.lastDayOfMonth()).getDayOfMonth();

        for (final var expenseDB: getAllExpenses()){
            var expense = expenseDB.copy();

            // all expenses have timeStamp of dueDay at 00:00:00 except for expenses of the last day which have time of 21:00:00
            LocalDateTime expenseTimeStamp = LocalDateTime.of(thisDateExpenses.toLocalDate(), LocalTime.of(0,0,0));

            // if this expense doesn't have due day (like bank fee) - continue
            if (expense.getDue_day()==null) continue;

            // update due day for all other months
            if(expense.getDue_day() == 31){
                expenseTimeStamp = expenseTimeStamp.withHour(LAST_DAY_EXPENSE_TIME.getHour()).withMinute(LAST_DAY_EXPENSE_TIME.getMinute());
                expense.setDue_day(lastDayOfMonth);
            }

            // if expense due day does not match with thisDateExpenses's day
            if (thisDateExpenses.getDayOfMonth()!=expense.getDue_day()) continue;

            // calculate tax only after 21:00
            if(expense.getAmount() == null){
                if(thisDateExpenses.toLocalTime().isBefore(LAST_DAY_EXPENSE_TIME)) continue;
                var firstDay = thisDateExpenses.withDayOfMonth(1).withHour(0).withMinute(0);
                var lastDay = expenseTimeStamp;

                // find all transactions for this month with 'card' payment type
                Set<TransactionEnt> taxableTransactions;
                if(transactions.length == 0)
                    taxableTransactions = transactionsService.findAllTransactionsBetweenWithPayType(firstDay, lastDay, "card");
                else {
                    taxableTransactions = Arrays.stream(transactions)
                            .filter(
                                    t->t.getDate_time().isAfter(firstDay) &&
                                            t.getDate_time().isBefore(lastDay) &&
                                            t.getPayment_type().equals("card")
                            )
                            .collect(Collectors.toSet());
                }

                // calculate and set the amount
                BigDecimal taxTotal = taxableTransactions.stream()
                        .map(t->t.getMoney_posted().multiply(new BigDecimal(expense.getPercent())))
                        .reduce(BigDecimal.ZERO, BigDecimal::add);
                expense.setAmount(taxTotal);
            }
            expenses.add(
                    new MoneyFlowEnt(expenseTimeStamp,
                            expense.getSource(),
                            expense.getDest(),
                            expense.getAmount().setScale(2, RoundingMode.HALF_UP),
                            "%s %s".formatted(expenseTimeStamp.toLocalDate().format(DateTimeFormatter.ofPattern("MMM")),expense.getDescription()),
                            null
                    )
            );
        }

        return expenses;
    }

    @Cacheable(cacheNames="expenses")
    public List<ExpenseEnt> getAllExpenses(){
        return StreamSupport.stream(expensesRepo.findAll().spliterator(), false).toList();
    }

    @Transactional
    @CacheEvict(cacheNames="expenses", allEntries = true)
    public List<ExpenseEnt> updateExpenses(List<ExpenseEnt> expenses){
        return StreamSupport.stream(expensesRepo.saveAll(expenses).spliterator(), false).toList();
    }

    @Transactional
    @CacheEvict(cacheNames="expenses", allEntries = true)
    public void deleteExpense(Long expense_id){
        expensesRepo.deleteById(expense_id);
    }

}
