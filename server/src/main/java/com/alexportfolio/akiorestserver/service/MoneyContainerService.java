package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.MoneyContainerRepo;
import com.alexportfolio.akiorestserver.repository.entities.MoneyContainerEnt;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.TreeSet;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@AllArgsConstructor
public class MoneyContainerService {
    private MoneyContainerRepo moneyContainerRepo;

    public MoneyContainerEnt findByContainerName(String name){
        return moneyContainerRepo.findByContainerName(name);
    }

    public TreeSet<MoneyContainerEnt> findAll(){
        return StreamSupport.stream(moneyContainerRepo.findAll().spliterator(),false).collect(Collectors.toCollection(TreeSet::new));
    }

    @Transactional
    public Iterable<MoneyContainerEnt> saveAll(Iterable<MoneyContainerEnt> entities){
        return moneyContainerRepo.saveAll(entities);
    }

    @Transactional
    public void resetContainer(String name){
        var container = moneyContainerRepo.findByContainerName(name);
        container.setBalance(new BigDecimal(0));
        moneyContainerRepo.save(container);
    }
}
