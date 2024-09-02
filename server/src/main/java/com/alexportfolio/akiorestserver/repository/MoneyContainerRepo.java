package com.alexportfolio.akiorestserver.repository;
import com.alexportfolio.akiorestserver.repository.entities.MoneyContainerEnt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface MoneyContainerRepo extends CrudRepository<MoneyContainerEnt, String> {

    @Query("SELECT cc FROM MoneyContainerEnt cc where cc.containerName = :name")
    MoneyContainerEnt findByContainerName(@Param("name") String name);



}
