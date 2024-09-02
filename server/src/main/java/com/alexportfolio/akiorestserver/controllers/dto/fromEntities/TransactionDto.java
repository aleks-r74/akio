package com.alexportfolio.akiorestserver.controllers.dto.fromEntities;

import com.alexportfolio.akiorestserver.repository.entities.TransactionEnt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto  {
    private boolean finished;
    private boolean has_free_haircut;
    private int receipt_num;
    private String phone_num;
    private LocalDateTime date_time;
    private BigDecimal money_accepted;
    private BigDecimal money_posted;
    private String payment_type;
    private String services;
    private String employee;

    public TransactionDto(TransactionEnt ent){
        this.finished           =   ent.isFinished();
        this.has_free_haircut   =   ent.isHas_free_haircut();
        this.receipt_num        =   ent.getReceipt_num();
        this.phone_num          =   ent.getPhone_num();
        this.date_time          =   ent.getDate_time();
        this.money_accepted     =   ent.getMoney_accepted();
        this.money_posted       =   ent.getMoney_posted();
        this.payment_type       =   ent.getPayment_type();
        this.services           =   ent.getServices();
        this.employee =   ent.getEmployee();
    }
}
