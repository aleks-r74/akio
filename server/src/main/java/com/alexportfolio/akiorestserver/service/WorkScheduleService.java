package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.controllers.dto.schedule.ScheduleDto;
import com.alexportfolio.akiorestserver.repository.WorkScheduleRepo;
import com.alexportfolio.akiorestserver.repository.entities.WorkScheduleEnt;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WorkScheduleService {
    private WorkScheduleRepo workScheduleRepo;

    public List<WorkScheduleEnt> getSchedule(LocalDate from, LocalDate to){
        return workScheduleRepo.findAllBetween(from, to);
    }

    @Cacheable("schedule")
    public Map<LocalDate,List<String>> getScheduleMap(LocalDate from, LocalDate to){
        var dbList = workScheduleRepo.findAllBetween(from, to);

        // transforms results from db to Map<LocalDate,List<String>>
        Map<LocalDate,List<String>> schedule = entsToMap(dbList);

        // add "empty" days without schedule
        long daysBetween = ChronoUnit.DAYS.between(from, to);
        for(long day=0; day <= daysBetween; day++){
            schedule.merge(
                    from.plusDays(day),
                    List.of(), // empty list of employees if there is no schedule for this day
                    (oldValue,newValue)-> oldValue
            );
        }
        return schedule;
    }

    @CacheEvict(cacheNames = "schedule", allEntries = true)
    public void removeSchedule(List<ScheduleDto> list){
        workScheduleRepo.deleteAll(convertScheduleDtoToEnt(list));
    }

    @Transactional
    @CacheEvict(cacheNames = "schedule", allEntries = true)
    public void saveSchedule(List<ScheduleDto> schedule){
        List<WorkScheduleEnt> entList = convertScheduleDtoToEnt(schedule);
        workScheduleRepo.saveAll(entList);
    }

    private List<WorkScheduleEnt> convertScheduleDtoToEnt(List<ScheduleDto> list){
        return list.stream()
                .flatMap(dto->{
                    List<WorkScheduleEnt> entList = new ArrayList<>();
                    for (var employee : dto.getEmployees()){
                        entList.add(new WorkScheduleEnt(dto.getDate(),employee));
                    }
                    return entList.stream();
                }).toList();
    }

    private Map<LocalDate,List<String>> entsToMap(List<WorkScheduleEnt> list){
        return list.stream()
                        .collect(
                                Collectors.groupingBy(
                                        WorkScheduleEnt::getDate, Collectors.mapping(WorkScheduleEnt::getEmployee,Collectors.toList())
                                )
                        );
    }
}
