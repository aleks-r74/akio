package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.webParser.Parser;
import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.env.Environment;

import java.time.LocalDate;

//@SpringBootTest
public class ParserTest {
    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;
    @Autowired
    Parser parser;
    @Autowired
    Environment env;

    //@Test
    @Disabled
    void parserTest(){
        parser.login(env.getProperty("USR"), env.getProperty("PSW"));
        var transactions = parser.getTransactions(LocalDate.of(2024,7,14),LocalDate.of(2024,7,14));


    }
}
