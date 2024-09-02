package com.alexportfolio.akiorestserver.controllers;

import com.alexportfolio.akiorestserver.controllers.dto.fromEntities.TransactionDto;
import com.alexportfolio.akiorestserver.controllers.dto.transactions.TransactionsRequestDto;
import com.alexportfolio.akiorestserver.controllers.dto.transactions.TransactionsResponseDto;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import com.alexportfolio.akiorestserver.service.MoneyFlowService;
import com.alexportfolio.akiorestserver.service.TransactionsService;
import com.alexportfolio.akiorestserver.service.UsersService;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@AllArgsConstructor
public class TransactionsController {
    private TransactionsService transactionsService;
    private MoneyFlowService moneyFlowService;
    private UsersService usersService;

    @PostMapping("transactions")
    ResponseEntity<TransactionsResponseDto> getTransactions(@RequestBody TransactionsRequestDto request){
        Page<TransactionEnt> transactionsOnThePage = transactionsService.findAllTransactionsBetween(request.getFrom(), request.getTo(), request.getPage());
        var allTransactions = transactionsService.findAllTransactionsBetween(request.getFrom(), request.getTo());
        // crates map Username-SavedTransactionsSum
        Map<String,Integer> assignedTransactionsNameSum = allTransactions.stream()
                .filter(t->t.getEmployee()!=null)
                .collect(
                Collectors.groupingBy(TransactionEnt::getEmployee,Collectors.summingInt(t->t.getMoney_posted().intValue()))
        );
        // add all users to the map
        var users = usersService.getUsersByAuthorities(List.of(Authority.ROLE_EMPLOYEE));
        for(String user: users)
            assignedTransactionsNameSum.putIfAbsent(user,0);

        var response = new TransactionsResponseDto(
                allTransactions.size(),
                allTransactions.stream().mapToInt(t->t.getMoney_posted().intValue()).sum(),
                transactionsOnThePage.getContent().stream().mapToInt(t->t.getMoney_posted().intValue()).sum(),
                request.getPage(),
                transactionsOnThePage.getTotalPages(),
                transactionsOnThePage.getContent().stream().map(TransactionEnt::getDTO).collect(Collectors.toList()),
                assignedTransactionsNameSum
        );
        return new ResponseEntity<TransactionsResponseDto>(response, HttpStatus.OK);
    }

    // assigns employee for transactions. pass transactionDTOs with set field 'employee'
    @RolesAllowed({"ADMIN","SUPERUSER"})
    @PatchMapping("transactions")
    @Transactional
    ResponseEntity<Void> assignEmployeeFor(@RequestBody List<TransactionDto> transactionsToAssign){
            // assign transactions
            var transactions = transactionsService.assignTransactions(transactionsToAssign);
            // calculate salary
            Set<MoneyFlowEnt> salaryMoneyFlows = moneyFlowService.transactionsToSalaryMoneyFlows(transactions);
            // save moneyflow
            moneyFlowService.transferMoney(salaryMoneyFlows);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("transactions/last")
    ResponseEntity<LocalDateTime> lastTransactionTime(){
        return new ResponseEntity<LocalDateTime>(transactionsService.findLastTransaction().getDate_time(), HttpStatus.OK);
    }
}
