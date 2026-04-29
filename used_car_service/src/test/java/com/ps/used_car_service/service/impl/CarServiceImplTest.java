package com.ps.used_car_service.service.impl;

import com.ps.used_car_service.dto.CarCreateRequest;
import com.ps.used_car_service.entity.Car;
import com.ps.used_car_service.entity.CarStatus;
import com.ps.used_car_service.entity.FuelType;
import com.ps.used_car_service.entity.Transmission;
import com.ps.used_car_service.exception.ResourceNotFoundException;
import com.ps.used_car_service.repository.CarRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarServiceImplTest {

    @Mock
    private CarRepository carRepository;

    @InjectMocks
    private CarServiceImpl carService;

    @Test
    void shouldSaveCar() {
        CarCreateRequest request = new CarCreateRequest();
        request.setTitle("i20");
        request.setBrand("Hyundai");
        request.setYear(2020); // ✅ IMPORTANT
        request.setMileage(15000);
        request.setFuelType(FuelType.PETROL);
        request.setTransmission(Transmission.AUTOMATIC);
        request.setBasePrice(BigDecimal.valueOf(100000));

        when(carRepository.save(any(Car.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        var response = carService.saveCar(request);

        assertNotNull(response);
        assertEquals("i20", response.getTitle());

        verify(carRepository).save(any(Car.class));
    }

    @Test
    void shouldReturnCar_whenIdExists() {
        Car car = buildCar("i20");
        when(carRepository.findById(1L)).thenReturn(Optional.of(car));
        var response = carService.getById(1L);
        assertEquals("i20", response.getTitle());
    }


    @Test
    void shouldThrowException_whenCarNotFound() {
        when(carRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class,
                () -> carService.getById(1L));
    }

    @Test
    void shouldUpdateCar() {
        Car existing = buildCar("Old");
        CarCreateRequest request = new CarCreateRequest();
        request.setTitle("New");
        when(carRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(carRepository.save(any(Car.class))).thenReturn(existing);
        var response = carService.updateCar(1L, request);
        assertEquals("New", response.getTitle());
    }

    @Test
    void shouldDeleteCar() {
        when(carRepository.existsById(1L)).thenReturn(true);
        carService.delete(1L);
        verify(carRepository).deleteById(1L);
    }

    @Test
    void shouldThrowException_whenDeletingNonExistingCar() {
        when(carRepository.existsById(1L)).thenReturn(false);
        assertThrows(ResourceNotFoundException.class,
                () -> carService.delete(1L));
    }

    private static Car buildCar(String i20) {
        return Car.builder()
                .id(1L)
                .title(i20)
                .brand("Hyundai")
                .year(2020) // ✅ FIX
                .mileage(15000)
                .fuelType(FuelType.PETROL)
                .transmission(Transmission.AUTOMATIC)
                .basePrice(BigDecimal.valueOf(100000))
                .status(CarStatus.AVAILABLE)
                .imageUrls(new ArrayList<>())
                .priceComponents(new ArrayList<>())
                .build();
    }

}