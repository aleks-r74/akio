package com.alexportfolio.akiorestserver.repository;

import com.alexportfolio.akiorestserver.repository.entities.ExpenseEnt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ExpensesRepo extends CrudRepository<ExpenseEnt, Long> {

}
