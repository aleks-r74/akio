package com.alexportfolio.akiorestserver.repository.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="sixhaircut")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class SixHaircutEnt implements Comparable<SixHaircutEnt>{
    @Id
    LocalDateTime start_date_time;
    BigDecimal price;

    @Override
    public int compareTo(SixHaircutEnt o) {
       if(this.start_date_time.isBefore(o.getStart_date_time())) return -1;
       if(this.start_date_time.isAfter(o.getStart_date_time())) return 1;
       return 0;
    }
}
