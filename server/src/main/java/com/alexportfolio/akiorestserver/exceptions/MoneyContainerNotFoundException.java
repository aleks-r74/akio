package com.alexportfolio.akiorestserver.exceptions;

public class MoneyContainerNotFoundException extends RuntimeException{
    public MoneyContainerNotFoundException(String message){
        super(message);
    }
}
