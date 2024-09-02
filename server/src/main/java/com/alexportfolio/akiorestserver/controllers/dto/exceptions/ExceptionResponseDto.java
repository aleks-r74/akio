package com.alexportfolio.akiorestserver.controllers.dto.exceptions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter @Setter
public class ExceptionResponseDto {
    private boolean error = true;
    private String message;

    public ExceptionResponseDto(String message) {
        this.message = message;
    }
}
