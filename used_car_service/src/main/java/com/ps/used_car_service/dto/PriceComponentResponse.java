package com.ps.used_car_service.dto;

import com.ps.used_car_service.entity.PriceComponentType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PriceComponentResponse {
    private String name;
    private BigDecimal value;
    private BigDecimal amount;
    private BigDecimal percentage;
    private Boolean percentageBased;
    private PriceComponentType type;
}