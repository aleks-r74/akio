package com.alexportfolio.akiorestserver.repository.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;

@Entity
@Table(name="money_containers_log")
@AllArgsConstructor @NoArgsConstructor
@Setter @Getter @EqualsAndHashCode
@IdClass(MCLogEnt.MCLogID.class)
public class MCLogEnt implements Comparable<MCLogEnt>{
    @Id
    LocalDateTime timestamp;
    @Id @Column(name="container")
    String containerName;

    BigDecimal balance;

    @Override
    public int compareTo(MCLogEnt o) {
       int result= Comparator.comparing(MCLogEnt::getTimestamp)
               .thenComparing(ent->ent.getContainerName().toLowerCase().compareTo(o.getContainerName().toLowerCase()))
               .thenComparing(MCLogEnt::getBalance)
               .compare(this, o);
        return result;
    }
    @NoArgsConstructor @AllArgsConstructor @Getter @Setter
    @EqualsAndHashCode
    static public class MCLogID implements Serializable{
        private LocalDateTime timestamp;
        private String containerName;
    }

}
