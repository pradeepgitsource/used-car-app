package com.ps.used_car_service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ps.used_car_service.entity.CarStatus;
import com.ps.used_car_service.entity.FuelType;
import com.ps.used_car_service.entity.Transmission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CarCreateRequest {

    private String title;
    private String brand;

    private Integer year;
    private Integer mileage;

    private FuelType fuelType;
    private Transmission transmission;

    private BigDecimal basePrice;
    private List<PriceComponentRequest> priceComponents;
    private String location;

    private String description;
    private CarStatus status;
    private List<String> imageUrls;
}