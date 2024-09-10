package com.alexportfolio.akiorestserver.aspects;

import com.alexportfolio.akiorestserver.service.MCLogService;
import com.alexportfolio.akiorestserver.utils.DirectionValidator;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
@Aspect
public class UtilityAspects {

    private MCLogService mcLogService;
    private DirectionValidator directionValidator;

    @After("execution(* com.alexportfolio.akiorestserver.service.UsersService.*User(..))")
    public void reinitializeDirectionValidator(){
        directionValidator.init();
    }

    @After("execution(* com.alexportfolio.akiorestserver.service.MoneyFlowService.transferMoney(com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt, com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt...))")
    public void afterTransferMoney(JoinPoint jp) {
        // log operation
        mcLogService.log(LocalDateTime.now());
    }
}
