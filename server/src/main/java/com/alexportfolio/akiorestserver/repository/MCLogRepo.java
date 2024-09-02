package com.alexportfolio.akiorestserver.repository;

import com.alexportfolio.akiorestserver.repository.entities.MCLogEnt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Set;

@Repository
public interface MCLogRepo extends CrudRepository<MCLogEnt,MCLogEnt.MCLogID> {
    @Query("SELECT mcl FROM MCLogEnt mcl WHERE mcl.timestamp >= :start AND mcl.timestamp <= :end")
    Set<MCLogEnt> findAllBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT mcl FROM MCLogEnt mcl WHERE mcl.timestamp = (SELECT MAX(mcl2.timestamp) FROM MCLogEnt mcl2)")
    Set<MCLogEnt> getLastLogs();
}
