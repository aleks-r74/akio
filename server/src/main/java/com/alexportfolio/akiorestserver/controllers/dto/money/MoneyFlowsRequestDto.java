package com.alexportfolio.akiorestserver.controllers.dto.money;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class MoneyFlowsRequestDto {
    LocalDateTime from;
    LocalDateTime to;
    String source;
    String dest;
    Integer page;

}
