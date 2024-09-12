package com.alexportfolio.akiorestserver.aspects;

import com.alexportfolio.akiorestserver.utils.DirectionValidator;
import lombok.AllArgsConstructor;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Aspect
public class UtilityAspects {
    private DirectionValidator directionValidator;

    @After("execution(* com.alexportfolio.akiorestserver.service.UsersService.*User(..))")
    public void reinitializeDirectionValidator(){
        directionValidator.init();
    }
}
