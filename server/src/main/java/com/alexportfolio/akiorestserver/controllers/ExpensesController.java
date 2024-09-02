package com.alexportfolio.akiorestserver.controllers;

import com.alexportfolio.akiorestserver.repository.entities.ExpenseEnt;
import com.alexportfolio.akiorestserver.repository.entities.SixHaircutEnt;
import com.alexportfolio.akiorestserver.service.ExpensesService;
import com.alexportfolio.akiorestserver.service.SixHaircutService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
public class ExpensesController {
    ExpensesService expensesService;
    SixHaircutService sixHaircutService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("expenses")
    ResponseEntity<List<ExpenseEnt>> getAllExpenses(){
        var list = expensesService.getAllExpenses();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("expenses")
    ResponseEntity<List<ExpenseEnt>> updateExpenses(@RequestBody List<ExpenseEnt> expenses){
        var list = expensesService.updateExpenses(expenses);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("expenses/{expense_id}")
    ResponseEntity<List<ExpenseEnt>> updateExpenses(@PathVariable Long expense_id){
        expensesService.deleteExpense(expense_id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("expenses/sixhaircuts")
    ResponseEntity<List<SixHaircutEnt>> getAllRecords(){
        var list = sixHaircutService.getAll();
        return new ResponseEntity<List<SixHaircutEnt>>(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("expenses/sixhaircuts/{date}")
    ResponseEntity<Void> deleteSixHaircutDatePrice(@PathVariable LocalDateTime date){
        if(sixHaircutService.deleteDatePrice(date))
            return new ResponseEntity<Void>(HttpStatus.OK);
        else
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("expenses/sixhaircuts")
    ResponseEntity<List<SixHaircutEnt>> updateSixHaircutDatePrices(@RequestBody List<SixHaircutEnt> datePrices){
        sixHaircutService.saveAll(datePrices);
        return new ResponseEntity<>(sixHaircutService.getAll(), HttpStatus.OK);
    }
}
