package com.ps.used_car_service.dto;

import com.ps.used_car_service.entity.PriceComponentType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PriceComponentRequest {
    private String name;
    private BigDecimal amount;
    private BigDecimal percentage;
    private Boolean percentageBased;
    private PriceComponentType type;
}