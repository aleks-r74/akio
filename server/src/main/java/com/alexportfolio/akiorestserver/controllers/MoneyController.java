package com.alexportfolio.akiorestserver.controllers;

import com.alexportfolio.akiorestserver.controllers.dto.fromEntities.MoneyFlowDto;
import com.alexportfolio.akiorestserver.controllers.dto.money.*;
import com.alexportfolio.akiorestserver.repository.entities.MCLogEnt;
import com.alexportfolio.akiorestserver.repository.entities.MoneyContainerEnt;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import com.alexportfolio.akiorestserver.service.MCLogService;
import com.alexportfolio.akiorestserver.service.MoneyContainerService;
import com.alexportfolio.akiorestserver.service.MoneyFlowService;
import com.alexportfolio.akiorestserver.service.UsersService;
import com.alexportfolio.akiorestserver.service.SummaryService;
import com.alexportfolio.akiorestserver.utils.DirectionValidator;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class MoneyController {
    @NonNull
    private MoneyContainerService moneyContainerService;
    @NonNull
    private MoneyFlowService moneyFlowService;
    @NonNull
    private SummaryService summaryService;
    @NonNull
    private MCLogService mcLogService;
    @NonNull
    private UsersService usersService;
    @NonNull
    private DirectionValidator directionValidator;

    @Value("${system.receiptNumber.begins}")
    Integer systemReceiptBeginNum = 1000000;

    @GetMapping("money")
    ResponseEntity<ContainersSummaryDto> getContainers(){
       TreeSet<MoneyContainerDto> containersDto = moneyContainerService.findAll().stream()
               .map(c->{
                        var dto = c.getDTO();
                        dto.setDirections(moneyFlowService.getDirections(c.getContainerName()));
                        return dto;
                       }
               )
               .collect(Collectors.toCollection(TreeSet::new));
       var summarizedTransactions = summaryService.summaryMoneyFlows();

       String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
       int currUserAccessLevel = usersService.getCurrentUserAccessLevel();
       // last user's transactions (receiptNum > systemReceiptBeginNum)
       var lastTransactions = moneyFlowService
                .getMoneyFlowBetween(
                        LocalDateTime.of(LocalDate.now(),LocalTime.of(0,0)),
                        LocalDateTime.of(LocalDate.now(),LocalTime.of(23,59,59))
                )
                .stream()
                .filter(mfe->{
                    if(currUserAccessLevel == 1){
                        return mfe.getReceipt_num()> systemReceiptBeginNum && (mfe.getInitiator().equals(currentUser));
                    }
                    return mfe.getReceipt_num()> systemReceiptBeginNum;
                })
                .collect(Collectors.toCollection(TreeSet::new));
       List<Direction> allowedDirections =  directionValidator.getDirectionsForCurrentUser();
       var allowedSources = allowedDirections.stream().map(Direction::getSource).collect(Collectors.toCollection(TreeSet::new));
       var allowedDests = allowedDirections.stream().map(Direction::getDest).collect(Collectors.toCollection(TreeSet::new));
       return new ResponseEntity<>(
               new ContainersSummaryDto(containersDto, lastTransactions, summarizedTransactions, allowedSources,allowedDests),
               HttpStatus.OK
       );
    }

    @PostMapping("money")
    ResponseEntity<Iterable<MoneyContainerEnt>> updateContainer(@RequestBody MoneyFlowDto moneyFlowDto){
        moneyFlowService.transferMoney(moneyFlowDto.getEntity());
        return new ResponseEntity<>(moneyContainerService.findAll(), HttpStatus.OK);
    }

    @PostMapping("money/flow")
    ResponseEntity<MoneyFlowResponseDto> getMoneyFlows(@RequestBody MoneyFlowsRequestDto moneyFlowsRequestDto){
        Pageable pageable = PageRequest.of(moneyFlowsRequestDto.getPage(), 15, Sort.by("time_stamp").descending());
        Page<MoneyFlowEnt> mfPage = moneyFlowService.findMoneyFlowEntitiesBySourceAndDestinationBetweenDates(
                pageable,
                moneyFlowsRequestDto.getFrom(),
                moneyFlowsRequestDto.getTo(),
                moneyFlowsRequestDto.getSource(),
                moneyFlowsRequestDto.getDest()
                );
        var allMF = moneyFlowService.getMoneyFlowBetween(moneyFlowsRequestDto.getFrom(), moneyFlowsRequestDto.getTo());

        Integer totalTransactions = (int) allMF.stream()
                .filter(
                        mf->
                                mf.getSource().equals(moneyFlowsRequestDto.getSource()) &&
                                        mf.getDest().equals(moneyFlowsRequestDto.getDest())

                ).count();

        // sum of all transactions of the requested source-dest
        Integer totalSum = allMF.stream().filter(
                mf->
                        mf.getSource().equals(moneyFlowsRequestDto.getSource()) &&
                        mf.getDest().equals(moneyFlowsRequestDto.getDest())

        ).map(MoneyFlowEnt::getAmount).reduce(new BigDecimal("0"), BigDecimal::add).intValue();

        var mfList = mfPage.getContent();
        Integer totalSumPage = mfList.stream().filter(
                mf->
                        mf.getSource().equals(moneyFlowsRequestDto.getSource()) &&
                                mf.getDest().equals(moneyFlowsRequestDto.getDest())

        ).map(MoneyFlowEnt::getAmount).reduce(new BigDecimal("0"), BigDecimal::add).intValue();

        return new ResponseEntity<>(
                new MoneyFlowResponseDto(
                        moneyFlowsRequestDto.getPage(),
                        mfPage.getTotalPages(),
                        totalSum,
                        totalSumPage,
                        totalTransactions,
                        mfList
                ),
                HttpStatus.OK
        );
    }

    @GetMapping("money/flow")
    ResponseEntity<List<MoneyFlowEnt>> getMoneyFlowByReceiptNum(Integer receiptNum, LocalDateTime timeStamp){
        var moneyFlows = moneyFlowService.getMoneyFlowBetween(timeStamp, timeStamp);
        return new ResponseEntity<>(
                moneyFlows.stream().filter(mf->mf.getReceipt_num().equals(receiptNum)).toList(),
                HttpStatus.OK
        );
    }

    @DeleteMapping("money/flow/{receiptNumber}")
    ResponseEntity<Void> cancelMoneyFlow(@PathVariable Long receiptNumber){
        moneyFlowService.cancelTransaction(receiptNumber);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("money/logs")
    ResponseEntity<Map<LocalDateTime,TreeSet<MCLogEnt>>> getLogs(@RequestParam LocalDate date){
        // we should start with the last day of the previous month
        var from = LocalDateTime.of(date.withDayOfMonth(1), LocalTime.of(0,0,0)).minusDays(1);
        var to = LocalDateTime.of(date.withDayOfMonth(date.lengthOfMonth()), LocalTime.of(23,59,59));
        var response = mcLogService.getLogsBetween(from, to);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
