package com.alexportfolio.akiorestserver.utils;

import com.alexportfolio.akiorestserver.controllers.dto.money.Direction;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.service.UsersService;
import jakarta.annotation.PostConstruct;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class DirectionValidator {
    @NonNull
    UsersService usersService;

    @Value("${users.directions.allowed}")
    private String allowedDirectionsStr;

    private List<String> allUsers;

    private Map<Authority,List<Direction>> allowedDirections;

    @PostConstruct
    public void init(){
        // get all users
        allUsers = usersService.getUsersAndAuthorities().entrySet()
                .stream()
                .filter(entry->entry.getValue().contains(Authority.ROLE_EMPLOYEE))
                .map(Map.Entry::getKey)
                .toList();

        List<String> directions = new ArrayList<>(Arrays.asList(allowedDirectionsStr.split(",")));
        // divide directions to concrete and wildcard
        List<String> wildcardDirections = new ArrayList<>();
        Iterator<String> i = directions.iterator();
        while(i.hasNext()){
            String direction = i.next();
            if(direction.contains("%user%")){
                wildcardDirections.add(direction);
                i.remove();
            }
        }
        // transform wildcard directions to real and add them to the concrete
        directions.addAll(
                wildcardDirections.stream()
                        .flatMap(rawDirection->{
                            List<String> realDirections = new ArrayList<>();
                            for(var username: allUsers)
                                realDirections.add(rawDirection.replace("%user%",username));
                            return realDirections.stream();
                        }).toList()
        );
        // Group directions into Map "ROLE":"source->dist"
        Map<String,List<String>> map = directions.stream()
                .map(str->{
                    var kvArr = str.split(":");
                    return Map.entry(kvArr[1], kvArr[0]);
                })
                .collect(
                        Collectors.groupingBy(
                                Map.Entry::getKey,
                                Collectors.mapping(Map.Entry::getValue, Collectors.toList())
                        )
                );
        // transform string source->dist into Direction, result Map is "ROLE":List<Direction>
        this.allowedDirections = map.entrySet().stream()
                .map(entry->{
                    List<String> strDirList = entry.getValue();
                    List<Direction> directionList =  strDirList
                            .stream()
                            .map(strDir->{
                                var dirArr = strDir.split("->");
                                return new Direction(dirArr[0],dirArr[1]);
                            }).toList();
                           return Map.entry(entry.getKey(), directionList);
                })
                .collect(Collectors.toMap(entry-> Authority.valueOf(entry.getKey()), Map.Entry::getValue));

    }

    public boolean isDirectionAllowed(Direction d){
        return getDirectionsForCurrentUser().contains(d);
    }

    public List<Direction> getDirectionsForCurrentUser() {
        var currentUserAuth = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .map(str->Authority.valueOf(str.getAuthority()))
                .max(Enum::compareTo).orElse(Authority.ROLE_EMPLOYEE);
        var currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Direction> userDirections = new ArrayList<>();
        for(var key: allowedDirections.keySet()){
            if(key.getAccessLevel() > currentUserAuth.getAccessLevel()) continue;
            // add available for the user directions to userDirections
            var filteredDirections = allowedDirections.get(key).stream()
                                .filter(d->{
                                    // if accessLevel == 1, all directions where source/dest is user and not current user should be eliminated
                                    if(     currentUserAuth.getAccessLevel() == 1 &&
                                            (
                                                (allUsers.contains(d.getSource()) && !d.getSource().equals(currentUsername)) ||
                                                (allUsers.contains(d.getDest()) && !d.getDest().equals(currentUsername))
                                            )
                                    )
                                        return false;
                                    return true;
                                })
                    .toList();
            userDirections.addAll(filteredDirections);
        }
        return userDirections;
    }
}
