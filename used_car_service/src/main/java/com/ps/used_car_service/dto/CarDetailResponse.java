package com.ps.used_car_service.dto;

import com.ps.used_car_service.entity.CarStatus;
import com.ps.used_car_service.entity.FuelType;
import com.ps.used_car_service.entity.Transmission;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CarDetailResponse {
    private Long id;
    private String title;
    private String brand;

    private int year;
    private int mileage;
    private BigDecimal basePrice;

    private BigDecimal finalPrice;
    private List<PriceComponentResponse> priceComponents;
    private String location;

    private String description;
    private FuelType fuelType;
    private Transmission transmission;

    private CarStatus status;
    private List<String> imageUrls;
}
