package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.webParser.Parser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.mock.mockito.MockBean;

//@SpringBootTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TransactionsServiceTest {
    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;
    @MockBean
    Parser parser;

    @Autowired
    TransactionsService transactionsService;

}

