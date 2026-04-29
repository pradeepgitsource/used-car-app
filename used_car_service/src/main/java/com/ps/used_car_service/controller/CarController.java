package com.ps.used_car_service.controller;

import com.ps.used_car_service.dto.CarCreateRequest;
import com.ps.used_car_service.dto.CarDetailResponse;
import com.ps.used_car_service.dto.CarSearchCriteria;
import com.ps.used_car_service.dto.PageResponse;
import com.ps.used_car_service.entity.Car;
import com.ps.used_car_service.service.CarService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public ResponseEntity<PageResponse<CarDetailResponse>> getCars(CarSearchCriteria criteria,
                                                                   Pageable pageable) {
        Page<CarDetailResponse> response = carService.filter(criteria, pageable);
        return ResponseEntity.ok(new PageResponse<>(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDetailResponse> getCar(@PathVariable Long id) {
        CarDetailResponse car = carService.getById(id); // throws exception if not found
        return ResponseEntity.ok(car);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CarDetailResponse> create(@Valid @RequestBody CarCreateRequest request) {
        CarDetailResponse saved = carService.saveCar(request);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CarDetailResponse> update(@PathVariable Long id,
                                                    @Valid @RequestBody CarCreateRequest request) {
        CarDetailResponse updated = carService.updateCar(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        carService.delete(id);
        return ResponseEntity.noContent().build(); // 204
    }
}