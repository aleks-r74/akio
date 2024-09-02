package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.controllers.dto.salary.SalaryCalcDto;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SalaryService {
    @Value("${salary.percentage}")
    private BigDecimal percentage;
    @NonNull
    private TransactionsService transactionsService;
    @NonNull
    SixHaircutService sixHaircutService;

    public SalaryCalcDto calculateSalary(Collection<TransactionEnt> transactions) {
        var start = transactions.stream().map(TransactionEnt::getDate_time).min(LocalDateTime::compareTo);
        var end = transactions.stream().map(TransactionEnt::getDate_time).max(LocalDateTime::compareTo);
        if(start.isEmpty() || end.isEmpty()) throw new IllegalArgumentException("Can not calculate salary for these transactions");
        var startDT = start.get();
        var endDT = end.get();

        var free_cuts = (int) transactions.stream().filter(TransactionEnt::isHas_free_haircut).count();
        var free_cuts_sum = transactions.stream()
                .filter(TransactionEnt::isHas_free_haircut)
                .map(t->sixHaircutService.getPriceForDate(t.getDate_time()))
                .reduce(new BigDecimal("0"), BigDecimal::add);

        var gross = transactions.stream().map(TransactionEnt::getMoney_posted).reduce(new BigDecimal("0"), BigDecimal::add);
        var salary = gross.add(free_cuts_sum).multiply(percentage);

        var transactionDTOs = transactions.stream().map(TransactionEnt::getDTO).collect(Collectors.toList());
        return new SalaryCalcDto(startDT, endDT, transactionDTOs, free_cuts, salary);
    }

    public SalaryCalcDto calculateSalary(TransactionEnt transaction) {
        var free_cuts_sum = transaction.isHas_free_haircut() ? sixHaircutService.getPriceForDate(transaction.getDate_time()) : new BigDecimal("0");
        var gross = transaction.getMoney_posted();
        var salary = gross.add(free_cuts_sum).multiply(percentage);
        return new SalaryCalcDto(
                transaction.getDate_time(),
                transaction.getDate_time(),
                List.of(transaction.getDTO()),
                transaction.isHas_free_haircut() ? 1 : 0,
                salary
        );
    }

}
