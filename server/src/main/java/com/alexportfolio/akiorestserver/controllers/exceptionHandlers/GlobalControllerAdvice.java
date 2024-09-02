package com.alexportfolio.akiorestserver.controllers.exceptionHandlers;

import com.alexportfolio.akiorestserver.controllers.dto.exceptions.ExceptionResponseDto;
import com.alexportfolio.akiorestserver.exceptions.MinimalBalanceException;
import com.alexportfolio.akiorestserver.exceptions.MoneyContainerNotFoundException;
import com.alexportfolio.akiorestserver.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Component
public class GlobalControllerAdvice {
    @ExceptionHandler(MinimalBalanceException.class)
    public ResponseEntity<ExceptionResponseDto> handleMinimalBalanceException(MinimalBalanceException e) {
        ExceptionResponseDto errorResponse = new ExceptionResponseDto();
        errorResponse.setMessage(e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponseDto> handleIllegalArgumentException(IllegalArgumentException e) {
        ExceptionResponseDto errorResponse = new ExceptionResponseDto();
        errorResponse.setMessage(e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_ACCEPTABLE);
    }


    @ExceptionHandler(MoneyContainerNotFoundException.class)
    public ResponseEntity<ExceptionResponseDto> handleMoneyContainerNotFoundException(MoneyContainerNotFoundException e) {
        ExceptionResponseDto errorResponse = new ExceptionResponseDto();
        errorResponse.setMessage(e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionResponseDto> handleUserNotFoundException(UserNotFoundException e) {
        ExceptionResponseDto errorResponse = new ExceptionResponseDto();
        errorResponse.setMessage(e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_ACCEPTABLE);
    }
}
