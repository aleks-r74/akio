package com.alexportfolio.akiorestserver.repository.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name="work_schedule")
@IdClass(WorkScheduleEnt.WorkScheduleEntId.class)
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class WorkScheduleEnt implements Comparable<WorkScheduleEnt> {
    @Id
    LocalDate date;
    @Id
    String employee;

    @Override
    public int compareTo(WorkScheduleEnt o) {
        int result = this.date.compareTo(o.date);
        if(result == 0)
            result = this.employee.compareTo(o.employee);
        return result;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    public static class WorkScheduleEntId implements Serializable {
        LocalDate date;
        String employee;
    }
}
