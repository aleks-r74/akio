package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.controllers.dto.money.Direction;
import com.alexportfolio.akiorestserver.controllers.dto.users.UserRequestDto;
import com.alexportfolio.akiorestserver.exceptions.UserNotFoundException;
import com.alexportfolio.akiorestserver.repository.UsersRepo;
import com.alexportfolio.akiorestserver.repository.entities.AuthoritiesEnt;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.repository.entities.UserEnt;
import com.alexportfolio.akiorestserver.security.MutableUser;
import com.alexportfolio.akiorestserver.utils.DirectionValidator;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class UsersService {

    private UsersRepo usersRepo;
    private UserDetailsManager userDetailsManager;
    private PasswordEncoder passwordEncoder;
    private MoneyContainerService moneyContainerService;

    public Integer getCurrentUserAccessLevel(){
        if(SecurityContextHolder.getContext().getAuthentication() == null) return -1;
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .mapToInt(authStr-> Authority.valueOf(authStr).getAccessLevel())
                .max()
                .orElseGet(()->1);
    }

    @Cacheable("users")
    public Map<String, List<Authority>> getUsersAndAuthorities(){
        List<UserEnt> users = usersRepo.findAll();
        Map<String, List<Authority>> result = users.stream()
                .map(e->{
                    var newUserEnt = e.getCopy();
                    newUserEnt.setPassword(null);
                    return newUserEnt;
                }).collect(
                Collectors.groupingBy(
                        UserEnt::getUsername,
                        Collectors.flatMapping(
                                el->el.getAuthorities().stream().map(AuthoritiesEnt::getAuthority),
                                Collectors.toList()
                                )
                )
        );
        return result;
    }

    public List<String> getUsersByAuthorities(List<Authority> authorities){
        Map<String, List<Authority>> employees = getUsersAndAuthorities();
        return employees.entrySet().stream()
                .filter(entry->{
                    for(Authority userAuthority: entry.getValue())
                        if(authorities.contains(userAuthority)) return true;
                    return false;
                })
                .map(Map.Entry::getKey)
                .toList();
    }

    @CacheEvict(cacheNames = "users",allEntries = true, beforeInvocation=true)
    public void addUser(UserRequestDto user) {
        // check that credentials do not exist
        try{
            userDetailsManager.loadUserByUsername(user.getUsername());
            // if user found, it will return not_acceptable
            throw new IllegalArgumentException("Such user already exists");
        }catch(UsernameNotFoundException e){
            // if user wasn't found, we can proceed
        }
        if(user.getAuthorities().contains(Authority.ROLE_SUPERUSER)) user.getAuthorities().add(Authority.ROLE_EMPLOYEE);
        String[] authoritiesArrayStr = user.getAuthorities().stream().map(Enum::name).toArray(String[]::new);
        // create new user
        UserDetails newUser = User
                .withUsername(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .authorities(authoritiesArrayStr)
                .build();

        // writing the newUser to the DB
        userDetailsManager.createUser(newUser);
    }

    @CacheEvict(cacheNames = "users",allEntries = true, beforeInvocation=true)
    public void updateUser(UserEnt user){
        if(user.getPassword().isBlank()) throw new IllegalArgumentException("Error. New password can not be blank");
        try {
            UserDetails dbUser = userDetailsManager.loadUserByUsername(user.getUsername());
            MutableUser updUser = new MutableUser(dbUser);
            updUser.setPassword(passwordEncoder.encode(user.getPassword()));
            userDetailsManager.updateUser(updUser);

        }catch(AuthenticationException e){
            throw new IllegalArgumentException(("User not found"));
        }
    }

    @CacheEvict(cacheNames = "users",allEntries = true, beforeInvocation=true)
    public void deleteUser(String username){
        var user = usersRepo.findById(username);
        if(user.isEmpty()) throw new UserNotFoundException("User %s not found".formatted(username));
        Boolean isAdmin = user.get().getAuthorities().stream()
                .anyMatch(auth->auth.getAuthority().equals(Authority.ROLE_ADMIN));
        if(isAdmin && getUsersByAuthorities(List.of(Authority.ROLE_ADMIN)).size()==1)
            throw new IllegalArgumentException("User can not be deleted. At least one admin is required.");
        var container = moneyContainerService.findByContainerName(username);
        if(container.getBalance().intValue()!=0)
            throw new IllegalArgumentException("User can not be deleted. Balance not 0.00");
        userDetailsManager.deleteUser(username);
    }


}
