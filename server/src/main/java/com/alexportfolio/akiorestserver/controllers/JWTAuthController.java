package com.alexportfolio.akiorestserver.controllers;


import com.alexportfolio.akiorestserver.controllers.dto.users.UserRequestDto;
import com.alexportfolio.akiorestserver.security.AuthenticationObj;
import com.alexportfolio.akiorestserver.security.TokenProcessor;
import com.alexportfolio.akiorestserver.utils.Protector;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@AllArgsConstructor
public class JWTAuthController {
    UserDetailsManager userDetailsManager;
    TokenProcessor tokenProcessor;
    PasswordEncoder passwordEncoder;



    // accepts credentials, returns token
    @PostMapping(path="auth", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Void> login(@RequestBody UserRequestDto credentials){
        String reqUsername   = credentials.getUsername();
        String reqPass       = credentials.getPassword();
        UserDetails dbUser;
        if(!Protector.isAllowed(reqUsername))
            return new ResponseEntity<Void>(HttpStatus.LOCKED);

        try{ // load user by user name
                dbUser = userDetailsManager.loadUserByUsername(reqUsername);
                // checkin user's password
                if(!passwordEncoder.matches(reqPass, dbUser.getPassword())) {
                    Protector.complain(reqUsername);
                    throw new UsernameNotFoundException("");
                }
            } catch(UsernameNotFoundException e){
            return new ResponseEntity<Void>(HttpStatus.NOT_ACCEPTABLE);
        }
        var authObj = new AuthenticationObj(dbUser.getUsername(), true, dbUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authObj);

       return ResponseEntity.ok().header("token", tokenProcessor.generateToken(authObj)).build();
    }

}
