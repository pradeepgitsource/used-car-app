package com.ps.used_car_service.service;

import com.ps.used_car_service.dto.CarCreateRequest;
import com.ps.used_car_service.dto.CarDetailResponse;
import com.ps.used_car_service.dto.CarSearchCriteria;
import com.ps.used_car_service.entity.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CarService {
    Page<CarDetailResponse> filter(CarSearchCriteria dto, Pageable pageable);

    CarDetailResponse saveCar(CarCreateRequest carCreateRequest);

    CarDetailResponse getById(Long id);

    CarDetailResponse updateCar(Long id, CarCreateRequest request);

    void delete(Long id);
}
