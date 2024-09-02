package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.controllers.dto.salary.SalaryCalcDto;
import com.alexportfolio.akiorestserver.controllers.dto.summary.EmployeeSummaryDto;
import com.alexportfolio.akiorestserver.controllers.dto.summary.SummaryDto;
import com.alexportfolio.akiorestserver.controllers.dto.summary.SummaryResponseDto;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.MoneyContainerEnt;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class SummaryService {
    TransactionsService transactionsService;
    MoneyFlowService moneyFlowService;
    MoneyContainerService moneyContainerService;
    SalaryService salaryService;
    UsersService usersService;

    @Value("${cashContainers}")
    List<String> cashContainers;

    public SummaryResponseDto getSummaray(LocalDateTime start, LocalDateTime end){

        Set<TransactionEnt> transactions = transactionsService.findAllTransactionsBetween(start, end);

        List<MoneyFlowEnt> moneyFlows = moneyFlowService.getMoneyFlowBetween(start, end);

        // replace null employee to "Not Assigned"
        transactions = transactions.stream()
                            .map(t->{
                                if(t.getEmployee()==null){
                                    var newT =  t.getCopy();
                                    newT.setEmployee("Not Assigned");
                                    return newT;
                                }
                                return t;
                            })
                            .collect(Collectors.toSet());

        SummaryDto wholeSummary = getWholeSummary(transactions, moneyFlows);

        // getting each employee summary
        Map<LocalDate,List<EmployeeSummaryDto>> employeesSummary = getEmployeesSummary(transactions, moneyFlows);

        return new SummaryResponseDto(wholeSummary, employeesSummary);
        }

    private Map<LocalDate, List<EmployeeSummaryDto>> getEmployeesSummary(Collection<TransactionEnt> transactions, Collection<MoneyFlowEnt> moneyFlows) {
        Map<LocalDate, List<EmployeeSummaryDto>> employeesSummary = new HashMap<>();
        Map<LocalDate, List<TransactionEnt>> transactionsGroupedByDate = transactions.stream().collect(Collectors.groupingBy(t->t.getDate_time().toLocalDate()));
        Set<String> employees = transactions.stream().map(TransactionEnt::getEmployee).collect(Collectors.toSet());
        // for each date
        for(LocalDate date: transactionsGroupedByDate.keySet()){
            // all transactions of the date grouped by employee name
            Map<String, List<TransactionEnt>> transactionsOfDateByEmployee = transactionsGroupedByDate.get(date).stream().collect(Collectors.groupingBy(TransactionEnt::getEmployee));

            // iterate over all employees of the transactions collection and put their summaries into map
            List<EmployeeSummaryDto> employeesSummaryForDate = new ArrayList<>();
            for(String employee: employees){
                var employeeTransactions = transactionsOfDateByEmployee.get(employee);
                int receiptsAtDate = 0;
                int grossAtDate = 0;
                SalaryCalcDto salaryCalc = new SalaryCalcDto();
                if(employeeTransactions!=null){
                    receiptsAtDate = employeeTransactions.size();
                    grossAtDate = employeeTransactions.stream().map(TransactionEnt::getMoney_posted).reduce(new BigDecimal("0"), BigDecimal::add).intValue();
                    salaryCalc = salaryService.calculateSalary(employeeTransactions);
                }

                Integer paidAtDate = getPaidByDateAndUsername(date, employee, moneyFlows);

                if(employeeTransactions == null && paidAtDate == 0) continue;;

                var employeeSummaryAtDate = new EmployeeSummaryDto(
                        date,
                        employee,
                        receiptsAtDate,
                        grossAtDate,
                        salaryCalc.getFree_haircuts(),
                        salaryCalc.getSalary().intValue(),
                        paidAtDate
                );
                employeesSummaryForDate.add(employeeSummaryAtDate);

            }
            employeesSummary.put(date, employeesSummaryForDate);
        }
        return employeesSummary;
    }

    private SummaryDto getWholeSummary(Set<TransactionEnt> transactions, List<MoneyFlowEnt> moneyFlows){
        Map<String, List<TransactionEnt>> transactionsGroupedByEmployee = transactions.stream().collect(Collectors.groupingBy(TransactionEnt::getEmployee));
        int notAssignedTransactions = Optional.ofNullable(transactionsGroupedByEmployee.get("Not Assigned")).orElse(List.of()).size();
        BigDecimal totalRevenue = transactions.stream()
                .map(TransactionEnt::getMoney_posted)
                .reduce(new BigDecimal("0"), BigDecimal::add).setScale(2,RoundingMode.HALF_UP);

        int totalReceipts = transactions.size();
        int freeHaircuts = (int) transactions.stream().filter(TransactionEnt::isHas_free_haircut).count();

        double totalSalary = 0;
        Set<String> transactionsUsers =  transactions.stream().map(TransactionEnt::getEmployee).collect(Collectors.toSet());

        // it counts assigned salary
        for(String employee: transactionsUsers){
            totalSalary += moneyFlows.stream()
                    .filter(t->{
                        return t.getSource().equals("wallet") && t.getDest().equals(employee);
                    })
                    .map(MoneyFlowEnt::getAmount)
                    .reduce(new BigDecimal("0"), BigDecimal::add).doubleValue();
        }

        Map<String,BigDecimal> expenses = moneyFlows.stream()
                .filter(mf->{
                    return mf.getDest().equals("expenses") || // all expenses
                            (mf.getSource().equals("wallet") && transactionsUsers.contains(mf.getDest())); //salary
                })
                .collect(
                        Collectors.groupingBy( // Map<String, MoneyFlowEnt>
                                MoneyFlowEnt::getDescription,
                                Collectors.mapping(
                                        MoneyFlowEnt::getAmount, // transform MoneyFlowEnt to BigDecimal
                                        Collectors.reducing(new BigDecimal("0"), BigDecimal::add)) // reducing
                        )
                );

        BigDecimal netRevenue = totalRevenue.subtract(
                expenses.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add)
        ).setScale(2, RoundingMode.HALF_UP);

        Set<MoneyContainerEnt> containers = moneyContainerService.findAll();

        int totalCash = containers.stream()
                .filter(c-> cashContainers.contains(c.getContainerName()))
                .mapToInt(c->c.getBalance().intValue())
                .sum();

        List<String> users = usersService.getUsersByAuthorities(List.of(Authority.ROLE_EMPLOYEE));

        Map<String, BigDecimal> balances = containers.stream()
                .filter(c->users.contains(c.getContainerName()))
                .collect(
                        Collectors.toMap(
                                MoneyContainerEnt::getContainerName,
                                MoneyContainerEnt::getBalance,
                                (existing, replacement) -> existing
                        )
                );
        return new SummaryDto("", totalRevenue,expenses,netRevenue,totalCash,totalReceipts,freeHaircuts, notAssignedTransactions, balances);
    }

    private Integer getPaidByDateAndUsername(LocalDate date, String employee, Collection<MoneyFlowEnt> mf){
        return mf.stream()
                .filter(m->{
                    return m.getTime_stamp().toLocalDate().equals(date) && m.getSource().equals(employee) &&  m.getDest().equals("outflow");
                })
                .map(MoneyFlowEnt::getAmount)
                .reduce(new BigDecimal("0"), BigDecimal::add).intValue();
    }

    public TreeSet<MoneyFlowEnt> summaryMoneyFlows(){
        var now = LocalDateTime.now();
        var list = moneyFlowService.getMoneyFlowBetween(LocalDateTime.of(LocalDate.now().withDayOfMonth(1), LocalTime.of(0,0,0)),now);
        Map<String,TreeSet<MoneyFlowEnt>> map = list.stream()
                .collect(Collectors.groupingBy(mf->mf.getSource()+"->"+mf.getDest(),Collectors.toCollection(TreeSet::new)));

        for(String key: map.keySet()) {
            var valueList = map.get(key);
            var reduced = valueList.stream()
                    .reduce(new MoneyFlowEnt("","",BigDecimal.ZERO,""), (a, b) -> {
                        a.setTime_stamp(b.getTime_stamp());
                        a.setSource(b.getSource());
                        a.setDest(b.getDest());
                        a.setAmount(a.getAmount().add(b.getAmount()));
                        a.setDescription(b.getDescription());
                        a.setInitiator(b.getInitiator());
                        return a;
                    });
            if(!reduced.equals(new MoneyFlowEnt("","",BigDecimal.ZERO,"")))
                map.put(key,new TreeSet<>(Set.of(reduced)));
        }
        return map.values().stream().flatMap(Collection::stream).collect(Collectors.toCollection(TreeSet::new));
    }
}
