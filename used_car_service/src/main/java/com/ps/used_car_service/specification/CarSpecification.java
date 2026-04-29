package com.ps.used_car_service.specification;

import com.ps.used_car_service.dto.CarSearchCriteria;
import com.ps.used_car_service.entity.Car;
import com.ps.used_car_service.entity.CarStatus;
import org.springframework.data.jpa.domain.Specification;

public class CarSpecification {

    public static Specification<Car> filter(CarSearchCriteria searchCriteria, boolean isAdmin) {
        return (root, query, cb) -> {

            var predicate = cb.conjunction();

            if (!isAdmin){
                if (searchCriteria.status != null) {
                    predicate = cb.and(predicate, cb.equal(root.get("status"), searchCriteria.status));
                }else {
                    predicate = cb.and(predicate,
                            root.get("status").in(CarStatus.AVAILABLE, CarStatus.SOLD)
                    );
                }
            }
            if (searchCriteria.brand != null) {
                predicate = cb.and(predicate, cb.equal(root.get("brand"), searchCriteria.brand));
            }
            if (searchCriteria.fuelType != null) {
                predicate = cb.and(predicate, cb.equal(root.get("fuelType"), searchCriteria.fuelType));
            }
            if (searchCriteria.transmission != null) {
                predicate = cb.and(predicate, cb.equal(root.get("transmission"), searchCriteria.transmission));
            }
            if (searchCriteria.minPrice != null){
                predicate = cb.and(predicate, cb.ge(root.get("basePrice"), searchCriteria.minPrice));
            }
            if (searchCriteria.maxPrice != null)
                predicate = cb.and(predicate, cb.le(root.get("basePrice"), searchCriteria.maxPrice));

            return predicate;
        };
    }
}