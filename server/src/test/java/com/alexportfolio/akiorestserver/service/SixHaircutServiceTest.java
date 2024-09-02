package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.SixHaircutRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;

//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SixHaircutServiceTest {
    @MockBean
    WatchdogService watchdogService;
    @MockBean
    CommandLineRunner commandLineRunner;
    @MockBean
    ParserService parserService;

    @Autowired
    SixHaircutRepo sixHaircutRepo;

    //@Test
    void getPrice(){
        var sixHaircutService = new SixHaircutService(sixHaircutRepo);
        var price = sixHaircutService.getPriceForDate(LocalDateTime.now());
        System.out.println(price);
    }
}
