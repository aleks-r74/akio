package com.alexportfolio.akiorestserver.utils;

import com.alexportfolio.akiorestserver.repository.UsersRepo;
import com.alexportfolio.akiorestserver.service.ParserService;
import com.alexportfolio.akiorestserver.service.UsersService;
import com.alexportfolio.akiorestserver.service.WatchdogService;
import com.alexportfolio.akiorestserver.webParser.Parser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

//@SpringBootTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DirectionValidatorTest {
    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;
    @MockBean
    Parser parser;
    @Autowired
    DirectionValidator directionValidator;

    //@Test
    void initTest(){

    }
}
