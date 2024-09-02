package com.alexportfolio.akiorestserver.controllers.dto.schedule;

import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class ScheduleDto {

    LocalDate date;
    List<String> employees;

    public ScheduleDto(Map.Entry<LocalDate, List<String>> dbResponse){
        this.date = dbResponse.getKey();
        this.employees = dbResponse.getValue();

    }
}
