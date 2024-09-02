package com.alexportfolio.akiorestserver.controllers.dto.fromEntities;

import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class MoneyFlowDto {
    private String source;
    private String dest;
    private BigDecimal amount;
    private String description;

    public MoneyFlowEnt getEntity(){
        return new MoneyFlowEnt(this.source, this.dest, this.amount, this.description);
    }
}
