package com.alexportfolio.akiorestserver.repository.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Table(name="expenses")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ExpenseEnt implements Comparable<ExpenseEnt>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String source;
    String dest;
    Integer due_day;
    BigDecimal amount;
    Float percent;
    String description;

    @JsonIgnore
    public ExpenseEnt copy(){
        return new ExpenseEnt(this.id,this.source,this.dest,this.due_day,this.amount,this.percent,this.description);
    }

    @Override
    public int compareTo(ExpenseEnt o) {
        int result = Long.compare(this.id, o.getId());
        if (result == 0) {
            result = source.compareTo(o.getSource());
            if (result == 0) {
                result = dest.compareTo(o.getDest());
                if (result == 0) {
                    result = Integer.compare(this.due_day, o.getDue_day());
                    if (result == 0) {
                        result = this.description.compareTo(o.getDescription());
                        if (result == 0) {
                            if(amount!=null)
                               return amount.setScale(2, RoundingMode.HALF_UP).compareTo(o.getAmount().setScale(2,RoundingMode.HALF_UP));
                            if(percent!=null)
                               return percent.compareTo(o.getPercent());
                        }
                    }
                }
            }
        }
        return result;
    }

    @Override
    public String toString() {
        return "ExpenseEnt{" +
                "id=" + id +
                ", source='" + source + '\'' +
                ", dest='" + dest + '\'' +
                ", due_day=" + due_day +
                ", amount=" + amount +
                ", percent=" + percent +
                ", description='" + description + '\'' +
                '}';
    }
}
