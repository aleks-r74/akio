package com.alexportfolio.akiorestserver.repository.entities;


import com.alexportfolio.akiorestserver.controllers.dto.money.MoneyContainerDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Entity
@Table(name="money_containers")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class MoneyContainerEnt implements Comparable<MoneyContainerEnt> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "container")
    String containerName;
    BigDecimal balance;
    BigDecimal minBalance;
    Integer access_level;

    @JsonIgnore
    public MoneyContainerDto getDTO(){
        return new MoneyContainerDto(containerName,balance,minBalance,access_level, null);
    }


    @Override
    public int compareTo(MoneyContainerEnt o) {
        return containerName.compareTo(o.getContainerName());
    }
}
