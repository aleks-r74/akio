package com.alexportfolio.akiorestserver.repository.entities;

import com.alexportfolio.akiorestserver.controllers.dto.fromEntities.TransactionDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Entity
@Table(name="transactions")
@Getter @Setter @EqualsAndHashCode
public class TransactionEnt implements Comparable<TransactionEnt> {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    long id;
    boolean finished;
    boolean has_free_haircut;
    int receipt_num;
    String phone_num;
    LocalDateTime date_time;
    BigDecimal money_accepted;
    BigDecimal money_posted;
    String payment_type;
    String services;
    String employee;

    public TransactionEnt() {
    }

    public TransactionEnt(long id, boolean is_finished, int receipt_num, String phone_num, LocalDateTime date_time, BigDecimal money_accepted, BigDecimal money_posted, String payment_type, String services) {
        this.id = id;
        this.finished = is_finished;
        if(money_accepted.compareTo(new BigDecimal(2))<0 && finished) this.has_free_haircut = true;
        this.receipt_num = receipt_num;
        this.phone_num = phone_num;
        this.date_time = date_time;
        this.money_accepted = money_accepted.setScale(2, RoundingMode.HALF_UP);;
        this.money_posted = money_posted.setScale(2, RoundingMode.HALF_UP);;
        this.payment_type = payment_type;
        this.services = services;
    }
    public TransactionEnt(boolean is_finished, int receipt_num, String phone_num, LocalDateTime date_time, BigDecimal money_accepted, BigDecimal money_posted, String payment_type, String services) {
        this.id = id;
        this.finished = is_finished;
        if(money_accepted.compareTo(new BigDecimal(2))<0 && this.finished) this.has_free_haircut = true;
        this.receipt_num = receipt_num;
        this.phone_num = phone_num;
        this.date_time = date_time;
        this.money_accepted = money_accepted;
        this.money_posted = money_posted;
        this.payment_type = payment_type;
        this.services = services;
    }
    public TransactionEnt addInfo(BigDecimal additionalMoneyAccepted, BigDecimal additionalMoneyPosted, String additionalService) {
        if(additionalMoneyAccepted.compareTo(new BigDecimal(2))<0 && this.finished) this.has_free_haircut = true;
        this.money_accepted = this.money_accepted.add(additionalMoneyAccepted);
        this.money_posted = this.money_posted.add(additionalMoneyPosted);
        this.services = this.services + additionalService;
        return this;
    }
    @JsonIgnore
    public TransactionEnt getCopy(){
        var copy = new TransactionEnt(id, finished, receipt_num, phone_num, date_time, money_accepted, money_posted, payment_type, services);
        copy.setHas_free_haircut(has_free_haircut);
        return copy;
    }

    @Override
    public int compareTo(TransactionEnt o) {
        if(this.receipt_num == o.getReceipt_num() && this.date_time.equals(o.getDate_time()))
            return 0;
        if(this.date_time.isBefore(o.getDate_time()))
            return -1;
        return 1;
    }
    public TransactionDto getDTO(){
        return new TransactionDto(this.finished, this.has_free_haircut, this.receipt_num, this.phone_num, this.date_time, this.money_accepted, this.money_posted, this.payment_type, this.services, this.employee);
    }

    @Override
    public String toString() {
        return ""+receipt_num;
    }
}
