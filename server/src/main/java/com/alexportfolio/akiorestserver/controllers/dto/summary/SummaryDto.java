package com.alexportfolio.akiorestserver.controllers.dto.summary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Map;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class SummaryDto {
    String date;
    BigDecimal totalRevenue;
    Map<String, BigDecimal> expenses;
    BigDecimal netRevenue;
    int totalCash;
    int totalReceipts;
    int freeHaircuts;
    int notAssignedTransactions;
    Map<String,BigDecimal> balances;
}
