package com.ps.used_car_service.service.impl;

import com.ps.used_car_service.dto.*;
import com.ps.used_car_service.entity.Car;
import com.ps.used_car_service.entity.CarStatus;
import com.ps.used_car_service.entity.PriceComponent;
import com.ps.used_car_service.entity.PriceComponentType;
import com.ps.used_car_service.exception.NoChangeException;
import com.ps.used_car_service.exception.ResourceNotFoundException;
import com.ps.used_car_service.repository.CarRepository;
import com.ps.used_car_service.service.CarService;
import com.ps.used_car_service.specification.CarSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CarDetailResponse> filter(CarSearchCriteria criteria, Pageable pageable) {
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        Page<Car> cars = carRepository.findAll(
                CarSpecification.filter(criteria, isAdmin),
                pageable
        );
        return cars.map(car -> {
            BigDecimal finalPrice = calculateFinalPrice(car);
            List<PriceComponentResponse> components = mapToResponse(car);

            return mapToCarDetailResponse(car, finalPrice, components);
        });
    }

    @Override
    @Transactional
    public CarDetailResponse saveCar(CarCreateRequest request) {
        Car car = mapToEntity(request);
        if (request.getPriceComponents() != null) {
            List<PriceComponent> components = mapToComponents(request.getPriceComponents(), car);
            car.setPriceComponents(components);
        }
        Car savedCar = carRepository.save(car);
        BigDecimal finalPrice = calculateFinalPrice(car);
        List<PriceComponentResponse> components = mapToResponse(car);

        return mapToCarDetailResponse(car, finalPrice, components);
    }

    @Override
    @Transactional(readOnly = true)
    public CarDetailResponse getById(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Car not found with id: " + id)
                );
        BigDecimal finalPrice = calculateFinalPrice(car);
        List<PriceComponentResponse> components = mapToResponse(car);

        return mapToCarDetailResponse(car, finalPrice, components);
    }

    @Override
    @Transactional
    public CarDetailResponse updateCar(Long id, CarCreateRequest request) {
        Car existing = carRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found"));
        if (isSame(existing, request)) {
            throw new NoChangeException("No changes detected");
        }
        updateEntity(existing, request);
        Car car = carRepository.save(existing);

        BigDecimal finalPrice = calculateFinalPrice(car);
        List<PriceComponentResponse> components = mapToResponse(car);

        return mapToCarDetailResponse(car, finalPrice, components);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!carRepository.existsById(id)) {
            throw new ResourceNotFoundException("Car not found with id: " + id);
        }
        carRepository.deleteById(id);
    }

    private BigDecimal calculateFinalPrice(Car car) {
        BigDecimal finalPrice = car.getBasePrice();

        if (car.getPriceComponents() == null)
            return finalPrice;

        for (PriceComponent pc : car.getPriceComponents()) {
            BigDecimal value;
            if (Boolean.TRUE.equals(pc.getPercentageBased())) {
                value = car.getBasePrice()
                        .multiply(pc.getPercentage())
                        .divide(BigDecimal.valueOf(100));
            } else {
                value = pc.getAmount();
            }
            if (pc.getType() == PriceComponentType.ADDITION) {
                finalPrice = finalPrice.add(value);
            } else {
                finalPrice = finalPrice.subtract(value);
            }
        }
        return finalPrice;
    }

    private Car mapToEntity(CarCreateRequest req) {
        return Car.builder()
                .title(req.getTitle())
                .brand(req.getBrand())

                .year(req.getYear())
                .mileage(req.getMileage())

                .fuelType(req.getFuelType())
                .transmission(req.getTransmission())

                .basePrice(req.getBasePrice() != null ? req.getBasePrice() : BigDecimal.ZERO)
                .location(req.getLocation())

                .description(req.getDescription())
                .status(req.getStatus() == null ? CarStatus.AVAILABLE : req.getStatus())
                .imageUrls(
                        req.getImageUrls() != null ? new ArrayList<>(req.getImageUrls()) : new ArrayList<>()
                )
                .build();
    }

    private void updateEntity(Car existing, CarCreateRequest req) {
        existing.setTitle(req.getTitle());
        existing.setBrand(req.getBrand());

        if (req.getYear() != null)
            existing.setYear(req.getYear());

        if (req.getMileage() != null)
            existing.setMileage(req.getMileage());

        if (req.getFuelType() != null)
            existing.setFuelType(req.getFuelType());

        if (req.getTransmission() != null)
            existing.setTransmission(req.getTransmission());

        if (req.getBasePrice() != null)
            existing.setBasePrice(req.getBasePrice());

        if (req.getPriceComponents() != null) {
            existing.getPriceComponents().clear();
            List<PriceComponent> components = mapToComponents(req.getPriceComponents(), existing);

            existing.getPriceComponents().addAll(components);
        }

        if (req.getLocation() != null)
            existing.setLocation(req.getLocation());

        if (req.getDescription() != null)
            existing.setDescription(req.getDescription());

        if (req.getStatus() != null)
            existing.setStatus(req.getStatus());

        if (req.getImageUrls() != null)
            existing.setImageUrls(req.getImageUrls());
    }

    private List<PriceComponent> mapToComponents(List<PriceComponentRequest> reqs, Car car) {
        return reqs.stream().map(r -> {
            PriceComponent priceComponent = new PriceComponent();
            priceComponent.setName(r.getName());
            priceComponent.setAmount(r.getAmount());
            priceComponent.setPercentage(r.getPercentage());
            priceComponent.setPercentageBased(r.getPercentageBased() != null ? r.getPercentageBased() : false);
            priceComponent.setType(r.getType());
            priceComponent.setCar(car);
            return priceComponent;
        }).collect(Collectors.toCollection(ArrayList::new));
    }

    private List<PriceComponentResponse> mapToResponse(Car car) {
        if (car.getPriceComponents() == null) return new ArrayList<>();
        return car.getPriceComponents().stream().map(pc -> {
            BigDecimal value;
            if (Boolean.TRUE.equals(pc.getPercentageBased()) && pc.getPercentage() != null) {
                value = car.getBasePrice()
                        .multiply(pc.getPercentage())
                        .divide(BigDecimal.valueOf(100));
            } else {
                value = pc.getAmount() != null ? pc.getAmount() : BigDecimal.ZERO;
            }
            return new PriceComponentResponse(
                    pc.getName(),
                    value,
                    pc.getAmount(),
                    pc.getPercentage(),
                    pc.getPercentageBased() != null ? pc.getPercentageBased() : false,
                    pc.getType()
            );
        }).collect(Collectors.toCollection(ArrayList::new));
    }

    private CarDetailResponse mapToCarDetailResponse(Car car, BigDecimal finalPrice, List<PriceComponentResponse> components) {
        return CarDetailResponse.builder()
                .id(car.getId())
                .title(car.getTitle())
                .brand(car.getBrand())
                .year(car.getYear())
                .mileage(car.getMileage())
                .fuelType(car.getFuelType())
                .transmission(car.getTransmission())
                .basePrice(car.getBasePrice())
                .location(car.getLocation())
                .description(car.getDescription())
                .status(car.getStatus())
                .imageUrls(car.getImageUrls())
                .priceComponents(components)
                .finalPrice(finalPrice)
                .build();
    }

    private boolean isSame(Car c, CarCreateRequest r) {
        return Objects.equals(c.getTitle(), r.getTitle()) &&
                Objects.equals(c.getBrand(), r.getBrand()) &&
                Objects.equals(c.getYear(), r.getYear()) &&
                Objects.equals(c.getMileage(), r.getMileage()) &&
                Objects.equals(c.getFuelType(), r.getFuelType()) &&
                Objects.equals(c.getTransmission(), r.getTransmission()) &&
                Objects.equals(c.getBasePrice(), r.getBasePrice()) &&
                Objects.equals(c.getLocation(), r.getLocation()) &&
                Objects.equals(c.getDescription(), r.getDescription()) &&
                Objects.equals(c.getStatus(), r.getStatus()) &&
                Objects.equals(c.getImageUrls(), r.getImageUrls());
    }
}