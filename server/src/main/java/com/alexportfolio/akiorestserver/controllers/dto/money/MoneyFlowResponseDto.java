package com.alexportfolio.akiorestserver.controllers.dto.money;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MoneyFlowResponseDto {
    Integer currentPage;
    Integer totalPages;
    Integer totalSum;
    Integer totalSumPage;
    Integer transactionsNum;
    List<MoneyFlowEnt> moneyFlows;
}
