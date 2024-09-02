package com.alexportfolio.akiorestserver.controllers;

import com.alexportfolio.akiorestserver.controllers.dto.summary.SummaryResponseDto;
import com.alexportfolio.akiorestserver.service.SummaryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@RestController
@AllArgsConstructor
public class SummaryController {
    SummaryService summaryService;

    @GetMapping("summary")
    ResponseEntity<SummaryResponseDto> getSummary(@RequestParam("date") String dateStr){
        LocalDate date = LocalDate.parse(dateStr+"-01");
        var start = LocalDateTime.of(date, LocalTime.of(0,0,0));
        var end = LocalDateTime.of(date.withDayOfMonth(date.getMonth().maxLength()), LocalTime.of(23,59,59));
        var summary = summaryService.getSummaray(start, end);
        summary.getSummary().setDate(dateStr);
        return new ResponseEntity<>(summary, HttpStatus.OK);
    }
}
