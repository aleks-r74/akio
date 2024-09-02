package com.alexportfolio.akiorestserver.repository;

import com.alexportfolio.akiorestserver.repository.entities.SixHaircutEnt;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Set;

@Repository
public interface SixHaircutRepo extends CrudRepository<SixHaircutEnt, LocalDateTime> {

    Set<SixHaircutEnt> findAll();

    @Modifying
    @Query("DELETE FROM SixHaircutEnt she WHERE she.start_date_time = :date")
    int deleteByDate(@Param("date") LocalDateTime date);

}
