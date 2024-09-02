package com.alexportfolio.akiorestserver.controllers.dto.money;


import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContainersSummaryDto {
    Collection<MoneyContainerDto> containers;
    Collection<MoneyFlowEnt> lastTransactions;
    Collection<MoneyFlowEnt> summarizedTransactions;
    Collection<String> allowedSources;
    Collection<String> allowedDests;

}
