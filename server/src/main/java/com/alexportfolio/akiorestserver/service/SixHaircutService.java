package com.alexportfolio.akiorestserver.service;

import com.alexportfolio.akiorestserver.repository.SixHaircutRepo;
import com.alexportfolio.akiorestserver.repository.entities.SixHaircutEnt;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.StreamSupport;


@Service
@RequiredArgsConstructor
public class SixHaircutService {
    @NonNull
    SixHaircutRepo sixHaircutRepo;

    Set<SixHaircutEnt> dbSnapshot;
    LocalDateTime lastUpdate;

    void loadData(){
        dbSnapshot = sixHaircutRepo.findAll();
        lastUpdate = LocalDateTime.now();
    }

    public BigDecimal getPriceForDate(LocalDateTime date){
        if(lastUpdate==null || LocalDateTime.now().isBefore(lastUpdate.plusHours(1))) loadData();
        Optional<SixHaircutEnt> filtered = dbSnapshot.stream()
                .filter(
                        h->h.getStart_date_time().isEqual(date) ||
                                h.getStart_date_time().isBefore(date)
                )
                .max(SixHaircutEnt::compareTo);

        if(filtered.isEmpty()) throw new RuntimeException("No prices for the 6th haircuts found for the date " + date);
        return filtered.get().getPrice();
        }

    public List<SixHaircutEnt> getAll(){
        return StreamSupport.stream(sixHaircutRepo.findAll().spliterator(), false).toList();
    }

    @Transactional
    public void saveAll(List<SixHaircutEnt> list){
        sixHaircutRepo.saveAll(list);
        loadData();
    }

    @Transactional
    public boolean deleteDatePrice(LocalDateTime date){
        return sixHaircutRepo.deleteByDate(date) > 0;
    }
}
