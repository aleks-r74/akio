package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.exceptions.UserNotFoundException;
import com.alexportfolio.akiorestserver.repository.UsersRepo;
import com.alexportfolio.akiorestserver.repository.entities.Authority;
import com.alexportfolio.akiorestserver.webParser.Parser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

//@SpringBootTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserEntServiceTest {
    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;
    @MockBean
    Parser parser;
    @Autowired
    UsersService usersService;
    @Autowired
    UsersRepo usersRepo;

    @Test
    void saveTEst(){

    }

    //@Test
    void deleteAdminTest(){
        String username = "admin";
        var user = usersRepo.findById(username);
        if(user.isEmpty()) throw new UserNotFoundException("User %s not found".formatted(username));

        boolean isAdmin = user.get().getAuthorities().stream()
                .anyMatch(auth->auth.getAuthority().equals(Authority.ROLE_ADMIN));
        if(isAdmin && usersService.getUsersByAuthorities(List.of(Authority.ROLE_ADMIN)).size()==1)
            System.out.println("can't delete this user");

    }
}
