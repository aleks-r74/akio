package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.controllers.dto.fromEntities.TransactionDto;
import com.alexportfolio.akiorestserver.repository.TransactionsRepo;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Getter @Setter
@AllArgsConstructor
@Component
public class TransactionsService {
    private final TransactionsRepo transactionsRepo;
    private final UsersService usersService;

    @Cacheable("transactions")
    Set<TransactionEnt> findByReceiptNumsAndDate(List<Integer> receiptNums, LocalDateTime startDate, LocalDateTime endDate){
        return transactionsRepo.findByReceiptNumsAndDate(receiptNums, startDate,endDate);
    }
    @Cacheable("transactions")
    public Set<TransactionEnt> findAllTransactionsBetween(LocalDateTime startDate, LocalDateTime endDate){
        Set<TransactionEnt> transactions = new TreeSet<>();
        Pageable pageable;
        int pageNumber=0;
        Page<TransactionEnt> page;
        do {
            pageable = PageRequest.of(pageNumber, 100);
            page = transactionsRepo.findAllTransactionsBetween(pageable, startDate, endDate);
            transactions.addAll(page.getContent());
            pageNumber++;
        } while (page.hasNext());
        return transactions;
    }

    @Cacheable("transactions")
    public Page<TransactionEnt> findAllTransactionsBetween(LocalDateTime startDate, LocalDateTime endDate, Integer pageNum){
        Set<TransactionEnt> transactions = new TreeSet<>();
        Pageable pageable = PageRequest.of(pageNum, 15, Sort.by("date_time").descending());
        var dbResp = transactionsRepo.findAllTransactionsBetween(pageable, startDate, endDate);
        return dbResp;
    }

    @Cacheable("transactions")
    public Set<TransactionEnt> findAllTransactionsBetweenWithPayType(LocalDateTime startDate, LocalDateTime endDate, String payment_type){
        return transactionsRepo.findAllTransactionsBetweenWithPayType(startDate, endDate, payment_type);
    }

    @Cacheable("transactions")
    public TransactionEnt findLastTransaction(){
        return transactionsRepo.findLastTransaction();
    }

    @CacheEvict(cacheNames = "transactions", allEntries = true)
    public Iterable<TransactionEnt> saveAll(Iterable<TransactionEnt> transactions){
        return transactionsRepo.saveAll(transactions);
    }

    @Transactional
    @CacheEvict(cacheNames = "transactions", allEntries = true)
    public Set<TransactionEnt> assignTransactions(List<TransactionDto> transactionDtos){
        // get transactions from DB by receipts and date ranage
        var startDT = transactionDtos.stream().map(TransactionDto::getDate_time).min(LocalDateTime::compareTo).get();
        var endDT = transactionDtos.stream().map(TransactionDto::getDate_time).max(LocalDateTime::compareTo).get();

        List<String> systemUsers = usersService.getUsersByAuthorities(List.of(Authority.ROLE_EMPLOYEE));

        // this map contains employee's name as a key and List<Integer> of receipt's numbers as a value
        Map<String, List<Integer>> employeesReceipts = transactionDtos
                .stream()
                .filter(t->t.getEmployee()!=null && !t.getEmployee().equals(""))
                .collect(
                        Collectors.groupingBy(
                                TransactionDto::getEmployee,
                                Collectors.mapping(TransactionDto::getReceipt_num, Collectors.toList())
                        )
                );

        // for each employee from Dto:
        Set<TransactionEnt> updatedTransactions = new TreeSet<>();
        for(String employee : employeesReceipts.keySet()){
            if(!systemUsers.contains(employee)) throw new IllegalArgumentException("Transaction can not be assigned to this user: " + employee);
            // find transactions for the employee by employee receipt numbers
            List<Integer> employeeReceipts = employeesReceipts.get(employee);
            Set<TransactionEnt> transactions = findByReceiptNumsAndDate(employeeReceipts, startDT, endDT);
            // set employee for all found transactions
            transactions = transactions.stream()
                    .filter(t->t.getEmployee()==null)
                    .map(t->{
                        t.setEmployee(employee);
                        return t;
                    })
                    .collect(Collectors.toSet());
            if(transactions.isEmpty()) continue;
            updatedTransactions.addAll(transactions);
        }
        return StreamSupport.stream(saveAll(updatedTransactions).spliterator(),false).collect(Collectors.toSet());
    }

}
