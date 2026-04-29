package com.ps.used_car_service.dto;

import com.ps.used_car_service.entity.CarStatus;
import com.ps.used_car_service.entity.FuelType;
import com.ps.used_car_service.entity.Transmission;
import lombok.Data;

@Data
public class CarSearchCriteria {
    public String brand;
    public Double minPrice;
    public Double maxPrice;
    public FuelType fuelType;
    public CarStatus status;
    public Integer year;
    public Integer minMileage;
    public Integer maxMileage;
    public Transmission transmission;
    public String keyword;
}