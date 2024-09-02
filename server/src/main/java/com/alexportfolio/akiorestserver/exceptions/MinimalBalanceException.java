package com.alexportfolio.akiorestserver.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class MinimalBalanceException extends RuntimeException{
    public MinimalBalanceException(String message){
        super(message);
    }
}
