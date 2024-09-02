package com.alexportfolio.akiorestserver.aspects;

import com.alexportfolio.akiorestserver.controllers.dto.money.Direction;
import com.alexportfolio.akiorestserver.controllers.dto.summary.SummaryDto;
import com.alexportfolio.akiorestserver.controllers.dto.summary.SummaryResponseDto;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.MCLogEnt;
import com.alexportfolio.akiorestserver.repository.entities.MoneyContainerEnt;
import com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt;
import com.alexportfolio.akiorestserver.service.MCLogService;
import com.alexportfolio.akiorestserver.service.MoneyContainerService;
import com.alexportfolio.akiorestserver.service.MoneyFlowService;
import com.alexportfolio.akiorestserver.service.UsersService;
import com.alexportfolio.akiorestserver.utils.DirectionValidator;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;



import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Aspect
@RequiredArgsConstructor
public class RestrictionsAspects {
    @NonNull
    UsersService usersService;
    @NonNull
    MoneyContainerService moneyContainerService;
    @NonNull
    MCLogService mcLogService;
    @NonNull
    MoneyFlowService moneyFlowService;
    @NonNull
    DirectionValidator directionValidator;


    // removes money containers according to the user's access level
    @AfterReturning (value="execution(* com.alexportfolio.akiorestserver.service.MoneyContainerService.findAll())", returning="returnObj")
    public Iterable<MoneyContainerEnt> filterOutMoneyContainers(JoinPoint joinPoint, Iterable<MoneyContainerEnt> returnObj) throws Throwable {
        Integer currentUserAccessLevel = usersService.getCurrentUserAccessLevel();

        if(currentUserAccessLevel < 0) return returnObj;

        List<String> adminList = usersService.getUsersByAuthorities(List.of(Authority.ROLE_ADMIN));
        Set<String> allOtherUsers = getAllOtherUsers();

        var iterator = returnObj.iterator();
        while(iterator.hasNext()) {
            var container = iterator.next();

            if (
                // moneyContainer has acceessLevel > currentUser
                (container.getAccess_level() > currentUserAccessLevel) ||
                // remove all other user's container for a user with access level 1
                (currentUserAccessLevel == 1 && allOtherUsers.contains(container.getContainerName())) ||
                // also remove container of admin users
                (adminList.contains(container.getContainerName()))
                )
                iterator.remove();
        }
    return returnObj;
    }

    // removes containers from logs
    @AfterReturning (value="execution(* com.alexportfolio.akiorestserver.service.MCLogService.getLogsBetween(java.time.LocalDateTime,java.time.LocalDateTime))", returning="returnObj")
    public Map<LocalDateTime,TreeSet<MCLogEnt>> filterOutLogs(JoinPoint joinPoint, Map<LocalDateTime,TreeSet<MCLogEnt>> returnObj) throws Throwable {
        Integer currentUserAccessLevel = usersService.getCurrentUserAccessLevel();
        if(currentUserAccessLevel < 0) return returnObj;
        var availableContainers =moneyContainerService.findAll().stream()
                .map(MoneyContainerEnt::getContainerName)
                .collect(Collectors.toSet());
        for(var key: returnObj.keySet()) {
            Iterator<MCLogEnt> iterator = returnObj.get(key).iterator();
            while(iterator.hasNext()){
                var container = iterator.next();
                if(!availableContainers.contains(container.getContainerName()))
                    iterator.remove();
            }
        }
        return returnObj;
    }

    // remove all other users Directions from getDirections()
    @AfterReturning (value="execution(* com.alexportfolio.akiorestserver.service.MoneyFlowService.getDirections(String))", returning="returnObj")
    public List<Direction> filterDirections(JoinPoint joinPoint, List<Direction> returnObj) throws Throwable {
        Integer currentUserAccessLevel = usersService.getCurrentUserAccessLevel();
        Set<String> availContainers = moneyContainerService.findAll().stream()
                .map(MoneyContainerEnt::getContainerName).collect(Collectors.toSet());
        Set<String> allOtherUsers = getAllOtherUsers();

        var iterator = returnObj.iterator();
        while(iterator.hasNext()){
            Direction direction = iterator.next();

            boolean sourceNotAvailableContainer = !availContainers.contains(direction.getSource());
            boolean destNotAvailableContainer = !availContainers.contains(direction.getDest());
            boolean sourceAvailableContainer = availContainers.contains(direction.getSource());
            boolean sourceOtherUser = allOtherUsers.contains(direction.getSource());
            boolean destOtherUser =  allOtherUsers.contains(direction.getDest());
            boolean destIsOutflow =  direction.getDest().equals("outflow");
            boolean sourceIsOutflow =  direction.getSource().equals("outflow");
            boolean sourceIsWallet = direction.getSource().equals("wallet");

            if(currentUserAccessLevel == 1)
                if((sourceOtherUser && destIsOutflow) ||
                        (sourceAvailableContainer && destOtherUser) ||
                        (sourceNotAvailableContainer && destIsOutflow) ||
                        (sourceIsOutflow && destNotAvailableContainer) ||
                        (sourceIsWallet && destNotAvailableContainer)
                )
                    iterator.remove();

            if(currentUserAccessLevel == 2)
                if(
                        (sourceNotAvailableContainer && destIsOutflow) ||
                        (sourceIsOutflow && destNotAvailableContainer) ||
                        (sourceIsWallet && destNotAvailableContainer)
                )
                    iterator.remove();

            if(currentUserAccessLevel ==3)
                if(sourceNotAvailableContainer || destNotAvailableContainer)
                    iterator.remove();
        }
        return returnObj;
    }

    // apply restrictions on money transfer operations and set Initiator column
    @Before("execution(* com.alexportfolio.akiorestserver.service.MoneyFlowService.transferMoney(com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt, com.alexportfolio.akiorestserver.repository.entities.MoneyFlowEnt...))")
    public void beforeTransferMoney(JoinPoint jp){
        Object args[] = jp.getArgs();
        if(args == null || args.length == 0) return;
        MoneyFlowEnt mf = (MoneyFlowEnt) args[0];
        Integer currentUserAccessLevel = usersService.getCurrentUserAccessLevel();

        if(currentUserAccessLevel<0) return;
        if(!directionValidator.isDirectionAllowed(new Direction(mf.getSource(),mf.getDest())))
            throw new IllegalArgumentException("You are not authorized to transfer money from %s to %s".formatted(mf.getSource(),mf.getDest()));

        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();

        // add Initiator column to all persisted moneyFlowEnts
        mf.setInitiator(currentUser);

    }

    // applies restrictions on summary
    @AfterReturning (value="execution(* com.alexportfolio.akiorestserver.service.SummaryService.getSummaray(..))", returning="returnObj")
    SummaryResponseDto filterGetSummary(JoinPoint jp, SummaryResponseDto returnObj){
        if(usersService.getCurrentUserAccessLevel()==1) {
            returnObj.setSummary(new SummaryDto());
            for (String oUser : getAllOtherUsers())
                for (LocalDate date : returnObj.getEmployees().keySet())
                    returnObj.getEmployees().get(date).removeIf(item -> item.getName().equals(oUser) || item.getName().equals("Not Assigned"));
        }
        return returnObj;
    }

    @AfterReturning (value="execution(* com.alexportfolio.akiorestserver.service.SummaryService.summaryMoneyFlows())", returning="returnObj")
    public TreeSet<MoneyFlowEnt> filterSummaryMoneyFlows(JoinPoint jp, TreeSet<MoneyFlowEnt> returnObj){
        Integer currentUserAccessLevel = usersService.getCurrentUserAccessLevel();
        if(currentUserAccessLevel == 1){
            returnObj.clear();
            return returnObj;
        }
        Set<String> availContainers = moneyContainerService.findAll().stream()
                .map(MoneyContainerEnt::getContainerName).collect(Collectors.toSet());
        Set<String> allOtherUsers = getAllOtherUsers();
        var iterator = returnObj.iterator();
        while(iterator.hasNext()){
            var moneyFlow = iterator.next();
            boolean sourceNotAvailableContainer = !availContainers.contains(moneyFlow.getSource());
            if(currentUserAccessLevel==2 && sourceNotAvailableContainer)
                iterator.remove();
        }

        return returnObj;
    }

    private Set<String> getAllOtherUsers() {
        Set<String> allOtherUsers = usersService.getUsersAndAuthorities().keySet().stream()
                .filter(user->!SecurityContextHolder.getContext().getAuthentication().getName().equals(user))
                .collect(Collectors.toSet());
        return allOtherUsers;
    }


}
