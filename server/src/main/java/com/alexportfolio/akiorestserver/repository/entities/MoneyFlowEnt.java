package com.alexportfolio.akiorestserver.repository.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Objects;

@Entity
@Table(name="money_flow")
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class MoneyFlowEnt implements Comparable<MoneyFlowEnt> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Integer receipt_num;
    LocalDateTime time_stamp;
    String source;
    String dest;
    BigDecimal amount;
    String description;
    private String initiator = "System";

    public MoneyFlowEnt(String source, String dest, BigDecimal amount, String description) {
        this.source = source;
        this.dest = dest;
        this.amount = amount;
        this.description = description;
        this.time_stamp = LocalDateTime.now();
        this.receipt_num = null;
    }

    public MoneyFlowEnt(LocalDateTime time_stamp, String source, String dest, BigDecimal amount, String description, Integer receipt_num) {
        this.time_stamp = time_stamp;
        this.source = source;
        this.dest = dest;
        this.amount = amount;
        this.description = description;
        this.receipt_num = receipt_num;
    }

    @Override
    public int compareTo(MoneyFlowEnt o) {
        return Comparator.comparing(MoneyFlowEnt::getTime_stamp)
                .thenComparing(MoneyFlowEnt::getReceipt_num, Comparator.nullsFirst(Integer::compareTo))
                .thenComparing(MoneyFlowEnt::getSource)
                .thenComparing(MoneyFlowEnt::getDest)
                .thenComparing(MoneyFlowEnt::getDescription)
                .compare(this,o);
    }


    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        MoneyFlowEnt that = (MoneyFlowEnt) object;
        return Objects.equals(time_stamp, that.time_stamp) &&
                Objects.equals(source, that.source) &&
                Objects.equals(dest, that.dest) &&
                Objects.equals(amount.setScale(2,RoundingMode.HALF_UP), that.amount.setScale(2,RoundingMode.HALF_UP)) &&
                Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(time_stamp, source, dest, amount, description);
    }

    @Override
    public String toString() {
        return "MoneyFlowEnt{" +
                "id=" + id +
                ", time_stamp=" + time_stamp +
                ", source='" + source + '\'' +
                ", dest='" + dest + '\'' +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                '}';
    }
}
