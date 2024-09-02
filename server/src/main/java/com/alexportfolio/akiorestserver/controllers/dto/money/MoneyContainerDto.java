package com.alexportfolio.akiorestserver.controllers.dto.money;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class MoneyContainerDto implements Comparable<MoneyContainerDto> {
    String containerName;
    BigDecimal balance;
    BigDecimal minBalance;
    Integer access_level;
    List<Direction> directions;

    @Override
    public int compareTo(MoneyContainerDto o) {
        return containerName.toLowerCase().compareTo(o.getContainerName().toLowerCase());
    }
}

