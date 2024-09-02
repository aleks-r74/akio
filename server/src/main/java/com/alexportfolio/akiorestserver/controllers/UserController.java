package com.alexportfolio.akiorestserver.controllers;


import com.alexportfolio.akiorestserver.controllers.dto.users.UserRequestDto;
import com.alexportfolio.akiorestserver.controllers.dto.users.UsersResponseDto;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.service.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class UserController {
    UsersService usersService;

    // returns users that have specific role
    @GetMapping("users")
    ResponseEntity<List<String>> getEmployee(@RequestParam List<Authority> authorities){
        Map<String, List<Authority>> employees = usersService.getUsersAndAuthorities();
        List<String> users = usersService.getUsersByAuthorities(authorities);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("users/all")
    ResponseEntity<List<UsersResponseDto>> getAllUsers(){
        Map<String, List<Authority>> employees = usersService.getUsersAndAuthorities();
        var list = usersService.getUsersAndAuthorities().entrySet().stream().map(UsersResponseDto::new).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("users/authorities")
    ResponseEntity<List<String>> getAllAuthorities(){
        return new ResponseEntity<List<String>> (Authority.getNames(), HttpStatus.OK);
    }

    @PostMapping("users")
    ResponseEntity<List<UsersResponseDto>> addUser(@RequestBody UserRequestDto user){
        usersService.addUser(user);
        return getAllUsers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("users")
    ResponseEntity<Void> updatePassword(@RequestBody UserRequestDto user){
        usersService.updateUser(user.getUserEnt());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("users/{username}")
    ResponseEntity<List<UsersResponseDto>>  deleteUser(@PathVariable("username") String username){
        usersService.deleteUser(username);
        return getAllUsers();
    }
}
