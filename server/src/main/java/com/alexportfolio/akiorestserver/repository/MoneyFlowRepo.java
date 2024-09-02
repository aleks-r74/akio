package com.alexportfolio.akiorestserver.repository;

import com.alexportfolio.akiorestserver.controllers.dto.money.Direction;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Repository
public interface MoneyFlowRepo extends CrudRepository<MoneyFlowEnt, Long> {

    @Query("SELECT mfe FROM MoneyFlowEnt mfe WHERE mfe.time_stamp >= :start AND mfe.time_stamp <= :end")
    List<MoneyFlowEnt> findMoneyFlowEntityBetween(@Param("start") LocalDateTime start,
                                                  @Param("end") LocalDateTime end);

    @Query("""
    SELECT mfe FROM MoneyFlowEnt mfe 
    WHERE mfe.time_stamp >= :start 
    AND mfe.time_stamp <= :end
    AND (mfe.source = :source AND mfe.dest = :dest)
    """)
    Page<MoneyFlowEnt> findMoneyFlowEntitiesWithFilters(
            Pageable pageable,
            @Param("start") LocalDateTime startDT,
            @Param("end") LocalDateTime endDT,
            @Param("source") String source,
            @Param("dest") String dest
    );

    @Query(
            """
            SELECT new com.alexportfolio.akiorestserver.controllers.dto.money.Direction(mf.source,mf.dest) 
            FROM MoneyFlowEnt mf where mf.time_stamp >= :fromDate"""
    )
    @Cacheable("moneyflows")
    Set<Direction> findDirections(@Param ("fromDate") LocalDateTime fromDate);

    @Query("SELECT mfe FROM MoneyFlowEnt mfe WHERE mfe.receipt_num > :receipt_num")
    Set<MoneyFlowEnt> findMoneyFlowAfter(@Param("receipt_num") long receipt_num);

    @Query("SELECT mfe FROM MoneyFlowEnt mfe WHERE mfe.receipt_num = :receiptId and mfe.time_stamp >= :time_stamp")
    Set<MoneyFlowEnt> findMoneyFlowByReceipt(@Param("receiptId") long receiptId, @Param("time_stamp") LocalDateTime timestamp);
}
