package com.alexportfolio.akiorestserver.controllers.dto.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter @Setter
@AllArgsConstructor
public class ErrorNullFieldsDto {
    private final String error = "This fields can not be null";
    private List<String> fields;

    public ErrorNullFieldsDto() {
        this.fields = new ArrayList<>();
    }
}
