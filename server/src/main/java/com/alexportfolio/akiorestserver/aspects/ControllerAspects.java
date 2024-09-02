package com.alexportfolio.akiorestserver.aspects;

import com.alexportfolio.akiorestserver.controllers.dto.exceptions.ErrorNullFieldsDto;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.lang.reflect.Field;

@Aspect
@Component
public class ControllerAspects {
    @Around("execution(* com.alexportfolio.akiorestserver.controllers.*.*(..))") //intercepted methods
    public Object beforeEachController(ProceedingJoinPoint joinPoint) throws Throwable {
        Object [] arguments = joinPoint.getArgs();
        ErrorNullFieldsDto errorDto = new ErrorNullFieldsDto();

        // if intercepted method has 0, more than 1 parameter or just 1 null parameter, exit
        if(arguments.length == 0 || arguments.length > 1)
            return joinPoint.proceed(arguments);
        if(arguments[0] == null || arguments[0].equals("")){
            errorDto.getFields().add(joinPoint.getSignature().toLongString());
            return new ResponseEntity<String>("This endpoint expects to get 1 parameter but got 0", HttpStatus.BAD_REQUEST);
        }

        // we are using only first parameter - arguments[0] because when we receive DTO, the methods accept only one DTO parameter
        // getting reflective access to the requestBody object
        Class<?> req = arguments[0].getClass();

        // we're checking field of dto classes only
        if(!req.getName().toLowerCase().contains("dto")){
            return joinPoint.proceed(arguments); // call to the intercepted method.
        }
        Field[] fields = req.getDeclaredFields();
        for(var field: fields){
            field.setAccessible(true);
            Object fieldValue = field.get(arguments[0]);
            if(fieldValue == null)
                errorDto.getFields().add(field.getName());
        }
        if(errorDto.getFields().size()>0) {
            MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
            headers.add("Content-Type", "application/json");
            return new ResponseEntity<ErrorNullFieldsDto>(errorDto, headers, HttpStatus.BAD_REQUEST);
        }
        return joinPoint.proceed(arguments); // call to the intercepted method.

    }

}
