package com.alexportfolio.akiorestserver.service;


import com.alexportfolio.akiorestserver.controllers.dto.money.Direction;
import com.alexportfolio.akiorestserver.controllers.dto.salary.SalaryCalcDto;
import com.alexportfolio.akiorestserver.exceptions.MinimalBalanceException;
import com.alexportfolio.akiorestserver.exceptions.MoneyContainerNotFoundException;
import com.alexportfolio.akiorestserver.repository.MoneyFlowRepo;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.MoneyContainerEnt;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MoneyFlowService {
    @NonNull
    private MoneyContainerService moneyContainerService;
    @NonNull
    private MoneyFlowRepo moneyFlowRepo;
    @NonNull
    private ExpensesService expensesService;
    @NonNull
    private SalaryService salaryService;
    @NonNull
    private MCLogService mcLogService;
    @NonNull
    private UsersService usersService;
    @NonNull
    private TransactionsService transactionsService;

    @Value("${resetContainers}")
    List<String> resetContainers;

    @Value("${money.transfer.amount.max}")
    Integer maxTransferSum;
    @Value("${system.receiptNumber.begins}")
    Integer systemReceiptBeginNum = 1000000;

    private LocalDateTime lastFixedExpensesApplicationTime;

    public Set<MoneyFlowEnt> transactionsToSalaryMoneyFlows(Collection<TransactionEnt> transactions){
        return transactions.stream().filter(t->t.getEmployee()!=null && !t.getEmployee().isBlank()).map(this::transactionToSalaryMoneyFlow).collect(Collectors.toSet());
    }

    public MoneyFlowEnt transactionToSalaryMoneyFlow(TransactionEnt transactionEnt){
        SalaryCalcDto salaryForDate = salaryService.calculateSalary(transactionEnt);
            return
                new MoneyFlowEnt(
                        transactionEnt.getDate_time(),
                        "wallet",
                        transactionEnt.getEmployee(),
                        salaryForDate.getSalary(),
                        "salary",
                        transactionEnt.getReceipt_num());
    }

    public TreeSet<MoneyFlowEnt> transactionsToMoneyFlow(TreeSet<TransactionEnt> transactions){
        TreeSet<MoneyFlowEnt> moneyFlowEnts = new TreeSet<>();
        TransactionEnt[] transactArr = transactions.toArray(new TransactionEnt[0]);
        TransactionEnt lastTransaction = null;
        for(var transactionEnt: transactions){
            // apply dated expenses to the previous day
            if(lastTransaction != null){
                boolean dayPassed = ChronoUnit.DAYS.between(lastTransaction.getDate_time().toLocalDate(), transactionEnt.getDate_time().toLocalDate())==1;
                if(dayPassed)
                    moneyFlowEnts.addAll(
                            expensesService.getExpensesForDate(lastTransaction.getDate_time().withHour(21), transactions.toArray(new TransactionEnt[0]))
                    );
            }
            // get percent-based expenses
            moneyFlowEnts.addAll(
                expensesService.getPercentBasedExpenses(transactionEnt)
            );
            MoneyFlowEnt moneyFlowEnt=null;
            switch(transactionEnt.getPayment_type()){
                case "cash":{
                    moneyFlowEnt =
                            new MoneyFlowEnt(
                                transactionEnt.getDate_time(),
                                "clients",
                                "terminal",
                                transactionEnt.getMoney_accepted(),
                                "cash",
                                transactionEnt.getReceipt_num()
                            );
                    break;
                }
                case "card":{
                    moneyFlowEnt =
                            new MoneyFlowEnt(
                                transactionEnt.getDate_time(),
                                "clients",
                                "bank",
                                transactionEnt.getMoney_posted(),
                                "card",
                                 transactionEnt.getReceipt_num()
                            );
                    break;
                }
            }
            moneyFlowEnts.add(moneyFlowEnt);
            // check if the client put more money than needed
            if(transactionEnt.getMoney_accepted().compareTo(transactionEnt.getMoney_posted()) > 0){
               BigDecimal cashBack = transactionEnt.getMoney_accepted().subtract(transactionEnt.getMoney_posted());
                   moneyFlowEnts.add(
                           new MoneyFlowEnt(transactionEnt.getDate_time(),"wallet","clients",cashBack,
                                   "cashback. the client put more money than necessary",transactionEnt.getReceipt_num()
                           )
                   );
            }

            lastTransaction = transactionEnt;
            if(transactionEnt.getEmployee() == null) continue;
            SalaryCalcDto salaryForDate = salaryService.calculateSalary(transactionEnt);

            //add salary
            moneyFlowEnts.add(transactionToSalaryMoneyFlow(transactionEnt));
        }
        return moneyFlowEnts;
    }

    @Transactional
    @CacheEvict(value="moneyflows", allEntries = true)
    public void transferMoney(Set<MoneyFlowEnt> moneyFlowEnts){
        var startDate = moneyFlowEnts.stream().map(MoneyFlowEnt::getTime_stamp).min(Comparator.naturalOrder());
        var endDate = moneyFlowEnts.stream().map(MoneyFlowEnt::getTime_stamp).max(Comparator.naturalOrder());
        MoneyFlowEnt[] exclude = null;
        if(startDate.isPresent() && endDate.isPresent()){
            var dbResponse = moneyFlowRepo.findMoneyFlowEntityBetween(startDate.get(),endDate.get());
            exclude = dbResponse.toArray(new MoneyFlowEnt[0]);
        }
        MoneyFlowEnt prevMoneyFlow = null;
        for(var moneyFlow: moneyFlowEnts){
            try{
                // log moneycontainers each new date
                if(prevMoneyFlow!=null && prevMoneyFlow.getTime_stamp().toLocalDate().isBefore(moneyFlow.getTime_stamp().toLocalDate()))
                    mcLogService.log(prevMoneyFlow.getTime_stamp().withHour(0).withMinute(0).withSecond(0));
                // reset containers on a new month
                if(prevMoneyFlow!=null && prevMoneyFlow.getTime_stamp().getMonthValue()<moneyFlow.getTime_stamp().getMonthValue())
                    for(var containerToReset: resetContainers)
                        moneyContainerService.resetContainer(containerToReset);
                transferMoney(moneyFlow, exclude);
                prevMoneyFlow = moneyFlow;
            } catch (MinimalBalanceException e){
                moneyFlowRepo.save(
                        new MoneyFlowEnt(
                                moneyFlow.getTime_stamp(),
                                moneyFlow.getSource(),
                                moneyFlow.getDest(),
                                new BigDecimal(0),
                                "WARNING. Can't transfer %.1f %s - %s".formatted(moneyFlow.getAmount(), moneyFlow.getDescription(), e.getMessage()),
                                9_999_999
                                )
                        );

            }
        }
    }

    @Transactional
    @CacheEvict(value="moneyflows", allEntries = true)
    public void transferMoney(MoneyFlowEnt moneyFlowEnt, MoneyFlowEnt... exclude){
        if( moneyFlowEnt== null )
            throw new IllegalArgumentException("moneyFlow can not be null");
        if( moneyFlowEnt.getSource().equals(moneyFlowEnt.getDest()) )
            throw new IllegalArgumentException("The source and destination can not be the same");
        if( moneyFlowEnt.getDescription() == null || moneyFlowEnt.getDescription().isBlank() )
            throw new IllegalArgumentException("Description of the transaction can not be empty");
        if( moneyFlowEnt.getAmount().compareTo(new BigDecimal(0)) < 0 )
            throw new IllegalArgumentException("Amount can not be negative");
        if( moneyFlowEnt.getAmount().compareTo(BigDecimal.valueOf(maxTransferSum))>0)
            throw new IllegalArgumentException("Amount can not be more than " + maxTransferSum);

        //check if the moneyFlow was saved before
        if(exclude!=null)
            for(var dbMoneyFlow: exclude){
                if (dbMoneyFlow.equals(moneyFlowEnt)) return;
            }

        MoneyContainerEnt source = moneyContainerService.findByContainerName(moneyFlowEnt.getSource());
        MoneyContainerEnt dest = moneyContainerService.findByContainerName(moneyFlowEnt.getDest());
        if(source == null) throw new MoneyContainerNotFoundException("Money can not be transferred, the source not found");
        if(dest == null) throw new MoneyContainerNotFoundException("Money can not be transferred, the destination not found");
        // if the min balance of the source is not null
        // and after the transaction it will exceed min balance of the source, throw exception
        if(source.getMinBalance() != null &&
                source.getBalance().subtract(moneyFlowEnt.getAmount()).compareTo(source.getMinBalance()) < 0
        )
            throw new MinimalBalanceException("Minimal balance for the %s is %.2f".formatted(source.getContainerName(), source.getMinBalance().floatValue()));
        // we change the source amount if it is not the outflow container
        if(!source.getContainerName().equals("outflow"))
            source.setBalance(
                    source.getBalance().subtract(moneyFlowEnt.getAmount())
            );

        // destination receives the amount if it is not the outflow container
        if(!dest.getContainerName().equals("outflow"))
            dest.setBalance(
                    dest.getBalance().add(moneyFlowEnt.getAmount())
            );
        List<MoneyContainerEnt> containers = List.of(source, dest);

        // update DB
        moneyContainerService.saveAll(containers);
        var savedEnt = moneyFlowRepo.save(moneyFlowEnt);

        // if there is no receipt num, set it to id
        if(moneyFlowEnt.getReceipt_num()==null){
            moneyFlowEnt.setReceipt_num((int)(systemReceiptBeginNum + savedEnt.getId()));
            savedEnt = moneyFlowRepo.save(savedEnt);
        }

    }

    @Transactional
    public void resetCustomMoneyContainers(){
        var today = LocalDateTime.now();
        // if today is not the first day, return
        if(today.getDayOfMonth() != 1) return;
        // if the time is after 9:00, return
        if(today.toLocalTime().isAfter(LocalTime.of(9,0,0))) return;
        if(moneyContainerService.findByContainerName("clients").getBalance().intValue()==0) return;
        for(var containerToReset: resetContainers)
            moneyContainerService.resetContainer(containerToReset);

    }

    @Transactional
    @CacheEvict(value="moneyflows", allEntries = true)
    public void applyDatedExpenses() {
        if(lastFixedExpensesApplicationTime!=null && LocalDateTime.now().isBefore(lastFixedExpensesApplicationTime.plusHours(1))) return;
        Set<MoneyFlowEnt> datedExpenses = expensesService.getExpensesForDate(LocalDateTime.now());
        if(!datedExpenses.isEmpty()) transferMoney(datedExpenses);
        lastFixedExpensesApplicationTime = LocalDateTime.now();
    }

    @CacheEvict(value="moneyflows", allEntries = true)
    public void save(MoneyFlowEnt mfe){
        moneyFlowRepo.save(mfe);
    }

    @Cacheable("moneyflows")
    public List<MoneyFlowEnt> getMoneyFlowBetween(LocalDateTime start, LocalDateTime end){
        return moneyFlowRepo.findMoneyFlowEntityBetween(start, end);
    }

    @Cacheable("moneyflows")
    public Page<MoneyFlowEnt> findMoneyFlowEntitiesBySourceAndDestinationBetweenDates(
                    Pageable pageable,LocalDateTime startDT,LocalDateTime endDT,String source,String dest){
        return moneyFlowRepo.findMoneyFlowEntitiesWithFilters(pageable, startDT, endDT, source, dest);
    }

    public List<Direction> getDirections(String containerName){
        return moneyFlowRepo.findDirections(LocalDateTime.now().minusMonths(1)).stream()
                .filter(d->d.getDest().equals(containerName)
                        || d.getSource().equals(containerName)
                )
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @Transactional
    @CacheEvict(value={"moneyflows","transactions"}, allEntries = true)
    public void cancelTransaction(long receiptNum){
        TransactionEnt clientTransaction = null; //transaction from the terminal
        var todayStart = LocalDateTime.of(LocalDate.now(),LocalTime.of(0,0));
        var todayEnd = LocalDateTime.of(LocalDate.now(),LocalTime.of(23,59,59));

        // receipt numbers < 1000000 belongs to the SoftLogic's terminal, more than userReceiptBeginNum - our user's and system transactions
        if(receiptNum< systemReceiptBeginNum)
            clientTransaction = transactionsService.findByReceiptNumsAndDate(List.of((int)receiptNum),todayStart, todayEnd)
                    .stream().findAny().orElseThrow(()->new IllegalArgumentException("There is no transaction with receipt %d today".formatted(receiptNum)));
        else { // check if there are transactions after it users transactions
            var result = moneyFlowRepo.findMoneyFlowAfter(receiptNum);
            if (!result.isEmpty())
                throw new IllegalArgumentException("You can cancel only last transaction. There are %d more transactions after %d"
                        .formatted(result.size(), receiptNum));
        }

        var entitiesToCancel = moneyFlowRepo.findMoneyFlowByReceipt(receiptNum, todayStart);
        for(var mf: entitiesToCancel){
            // for the external transaction (from the terminal) we cancel only wallet->user direction
            if(mf.getReceipt_num()< systemReceiptBeginNum && !mf.getSource().equals("wallet")) continue;
            cancelMoneyFlowEntity(mf);
        }
        // remove log for user transaction (all moneyflows have the same timestamp)
        if(receiptNum>systemReceiptBeginNum)
            entitiesToCancel.stream().findAny().ifPresent(mf->mcLogService.removeLog(mf.getTime_stamp()));
        // unassign employee for the client's transaction
        if(clientTransaction!=null){
            clientTransaction.setEmployee(null);
        }
    }

    @Transactional
    @CacheEvict(value={"moneyflows","transactions"}, allEntries = true)
    public void cancelMoneyFlowEntity(MoneyFlowEnt mf) {
        if(LocalDate.now().isAfter(mf.getTime_stamp().toLocalDate()))
            throw new IllegalArgumentException("The transaction can only be canceled on the same day");
        int currentUserAccessLevel = usersService.getCurrentUserAccessLevel();
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        var otherUsers = usersService.getUsersByAuthorities(List.of(Authority.ROLE_EMPLOYEE));
        boolean initiatorIsCurrentUser = mf.getInitiator().equals(currentUser);
        boolean initiatorIsSystem = mf.getInitiator().equals("System");
        // if access level 1 only current user's entity may be canceled
        // if access level 2 user can cancel any user and system transaction
        if(
                (currentUserAccessLevel == 1 && !initiatorIsCurrentUser) ||
                        (currentUserAccessLevel == 2 && !(otherUsers.contains(mf.getInitiator()) || initiatorIsSystem))
        )
            throw new IllegalArgumentException("You are not authorized to cancel this transaction");

        Set<MoneyContainerEnt> containers;
        // temporarily disable security context to get full list of moneyContainers
        var securityContext = SecurityContextHolder.getContext();
        try {
            SecurityContextHolder.clearContext();
            containers = moneyContainerService.findAll();
        } finally {
            SecurityContextHolder.setContext(securityContext);
        } // below we iterate over all containers and change balance when they equals to source o dest
        for (var container : containers) {
            // don't modify outflow
            if (container.getContainerName().equals("outflow")) continue;

            // add amount to the original source container
            if (container.getContainerName().equals(mf.getSource()))
                container.setBalance(container.getBalance().add(mf.getAmount()));

            // subtract amount from the original dest container
            if (container.getContainerName().equals(mf.getDest()))
                container.setBalance(container.getBalance().subtract(mf.getAmount()));

            // delete original entity
            moneyFlowRepo.delete(mf);
        }
    }

}

