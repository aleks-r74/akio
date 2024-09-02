package com.alexportfolio.akiorestserver.controllers.dto.transactions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TransactionsRequestDto {
    LocalDateTime from;
    LocalDateTime to;
    Integer page;
}
