package com.alexportfolio.akiorestserver.repository;
import com.alexportfolio.akiorestserver.repository.entities.WorkScheduleEnt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;



@Repository
public interface WorkScheduleRepo extends CrudRepository<WorkScheduleEnt, WorkScheduleEnt.WorkScheduleEntId> {

    @Query("SELECT s FROM WorkScheduleEnt s WHERE s.date >= :startDate AND s.date <= :endDate")
    List<WorkScheduleEnt> findAllBetween(LocalDate startDate, LocalDate endDate);

}
