package com.alexportfolio.akiorestserver.repository;

import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;



import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


public interface TransactionsRepo extends CrudRepository<TransactionEnt, Long> {

    @Query("SELECT t FROM TransactionEnt t WHERE t.receipt_num IN :receipt_nums AND t.date_time >= :startDate AND t.date_time <= :endDate")
    Set<TransactionEnt> findByReceiptNumsAndDate(@Param("receipt_nums") List<Integer> receiptNums, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT t FROM TransactionEnt t WHERE t.date_time >= :startDate AND t.date_time <= :endDate")
    Page<TransactionEnt> findAllTransactionsBetween(Pageable pageable, LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT t FROM TransactionEnt t WHERE t.payment_type = :payment_type AND t.date_time > :startDate AND t.date_time < :endDate")
    Set<TransactionEnt> findAllTransactionsBetweenWithPayType(LocalDateTime startDate, LocalDateTime endDate, String payment_type);

    @Query("""
    SELECT t FROM TransactionEnt t 
    WHERE t.date_time = (SELECT MAX(t2.date_time) FROM TransactionEnt t2) 
    AND t.id = (SELECT MAX(t3.id) FROM TransactionEnt t3 WHERE t3.date_time = t.date_time)""")
    TransactionEnt findLastTransaction();


}
