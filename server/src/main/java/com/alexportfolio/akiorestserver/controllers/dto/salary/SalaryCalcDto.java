package com.alexportfolio.akiorestserver.controllers.dto.salary;

import com.alexportfolio.akiorestserver.controllers.dto.fromEntities.TransactionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
public class SalaryCalcDto {
    private LocalDateTime from;
    private LocalDateTime to;
    private List<TransactionDto> transactions;
    private Integer free_haircuts;
    private BigDecimal salary;

    public SalaryCalcDto() {
        from = LocalDateTime.now();
        to = LocalDateTime.now();
        transactions = new ArrayList<>();
        salary = new BigDecimal("0");
    }
}
