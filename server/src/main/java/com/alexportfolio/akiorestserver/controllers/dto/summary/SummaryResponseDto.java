package com.alexportfolio.akiorestserver.controllers.dto.summary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class SummaryResponseDto {
    SummaryDto summary;
    Map<LocalDate,List<EmployeeSummaryDto>> employees;
}
