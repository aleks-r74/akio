package com.alexportfolio.akiorestserver.controllers;

import com.alexportfolio.akiorestserver.controllers.dto.schedule.ScheduleDto;
import com.alexportfolio.akiorestserver.service.WorkScheduleService;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class ScheduleController {
    WorkScheduleService workScheduleService;

    @GetMapping("employee/schedule")
    ResponseEntity<List<ScheduleDto>> getSchedule(@RequestParam LocalDate date){
        var startDate = date.withDayOfMonth(1);
        var endDate = date.withDayOfMonth(date.lengthOfMonth());
        Map<LocalDate,List<String>> dbResponse = workScheduleService.getScheduleMap(startDate, endDate);
        List<ScheduleDto> list = dbResponse.entrySet().stream().map(ScheduleDto::new).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RolesAllowed({"ADMIN","SUPERUSER"})
    @PutMapping("employee/schedule")
    ResponseEntity<List<ScheduleDto>> setSchedule(@RequestBody List<ScheduleDto> schedule){
        workScheduleService.saveSchedule(schedule);
        return getSchedule(schedule.getFirst().getDate());
    }

    @RolesAllowed({"ADMIN","SUPERUSER"})
    @DeleteMapping("employee/schedule")
    ResponseEntity<Void> removeSchedule(@RequestBody List<ScheduleDto> schedule){
        workScheduleService.removeSchedule(schedule);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
