package com.ps.used_car_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Id;

import java.math.BigDecimal;

@Entity
@Data
public class PriceComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private BigDecimal amount;
    private BigDecimal percentage;

    private Boolean percentageBased;

    @Enumerated(EnumType.STRING)
    private PriceComponentType type;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;
}
