package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.MCLogRepo;
import com.alexportfolio.akiorestserver.repository.entities.MCLogEnt;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Array;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class MCLogService {
    @NonNull
    private MCLogRepo mcLogRepo;
    @NonNull
    private MoneyContainerService moneyContainerService;

    @Value("${excludeFromLog}")
    List<String> excludeFromLog = List.of();

    private LocalDate lastLog;

    // when date is null log will be performed only before 9AM and the time will be set to 12AM
    @Transactional
    public void log(LocalDate date){
        // log is performed before the shift begins, once a day
        if(LocalTime.now().isAfter(LocalTime.of(9,0,0)) && date==null) return;
        if(date==null) date = LocalDate.now();

        // get last log either from DB or from the lastLog variable
        // get all logs from db with their ID's, update values, write back
        if(lastLog==null)
            lastLog = mcLogRepo.getLastLogs().stream()
                    .map(mcl->mcl.getTimestamp().toLocalDate())
                    .findAny()
                    .orElse(LocalDate.of(2023,1,1));
        // if there are no logs today
        if(lastLog.isBefore(date)){
            // log
            var timestamp = LocalDateTime.of(date,LocalTime.of(0,0,0));
            Set<MCLogEnt> logs = new TreeSet<>();
            for(var container: moneyContainerService.findAll())
                logs.add(new MCLogEnt(timestamp,container.getContainerName(),container.getBalance()));
            // save
            mcLogRepo.saveAll(logs);
            lastLog = date;
        }
    }

    public Map<LocalDateTime,TreeSet<MCLogEnt>> getLogsBetween(LocalDateTime start, LocalDateTime end){
        // load data from DB
        var result = new TreeSet<>(mcLogRepo.findAllBetween(start,end));
        // provide last result as current state of containers
        var timestamp = LocalDateTime.now();

        var currentStateSet = moneyContainerService.findAll().stream()
                .filter(c->!excludeFromLog.contains(c.getContainerName()))
                .map(c->new MCLogEnt(timestamp,c.getContainerName(),c.getBalance()))
                .collect(Collectors.toCollection(()->new TreeSet<MCLogEnt>(MCLogEnt::compareTo)));
        var currentStateContainers = currentStateSet.stream().map(MCLogEnt::getContainerName).collect(Collectors.toSet());
        // create Map
        Map<LocalDateTime,TreeSet<MCLogEnt>> resultMap = result.stream()
                .filter(mcl-> currentStateContainers.contains(mcl.getContainerName()))
                .collect(
                        Collectors.groupingBy(
                                MCLogEnt::getTimestamp,
                                Collectors.toCollection(()->new TreeSet<MCLogEnt>(MCLogEnt::compareTo)))
                );
        // if currentStateSet has more items than resultMap, add new items, otherwise remove them
        for(var entry: resultMap.entrySet()){
            // all container for the specific date
            var dateSet = resultMap.get(entry.getKey());
            var dateContainers = dateSet.stream().map(MCLogEnt::getContainerName).toList();
            if(dateSet.size()<currentStateContainers.size()){
                // this list holds all extra containers
                var extraItems = new ArrayList<>(currentStateContainers);
                extraItems.removeAll(dateContainers);
                dateSet.addAll(
                        extraItems.stream().map(newContainer->new MCLogEnt(entry.getKey(),newContainer, BigDecimal.ZERO))
                        .collect(Collectors.toCollection(TreeSet::new))
                );
            } else {
                // this list holds all containers that should be excluded
                var itemsToRemove = new ArrayList<>(dateContainers);
                itemsToRemove.removeAll(currentStateContainers);
                var newSet = dateSet.stream().filter(dateContainer->!itemsToRemove.contains(dateContainer.getContainerName()))
                        .collect(Collectors.toCollection(()->new TreeSet<MCLogEnt>(MCLogEnt::compareTo)));
                resultMap.put(entry.getKey(),newSet);
            }
        }

        // Add the current state only if the end date falls within the current month.
        if(end.getMonthValue()==timestamp.getMonthValue())
            resultMap.put(timestamp, currentStateSet);
        // create key-sorted Map
        Map<LocalDateTime,TreeSet<MCLogEnt>> sortedKeysMap = new TreeMap<>(Collections.reverseOrder());
        sortedKeysMap.putAll(resultMap);
        return sortedKeysMap;
    }
}
