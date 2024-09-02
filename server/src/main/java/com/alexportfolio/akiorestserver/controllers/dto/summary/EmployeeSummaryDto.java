package com.alexportfolio.akiorestserver.controllers.dto.summary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EmployeeSummaryDto {
    LocalDate date;
    String name;
    Integer receipts;
    Integer grossRev;
    Integer freeHaircuts;
    Integer salary;
    Integer paid;

}
