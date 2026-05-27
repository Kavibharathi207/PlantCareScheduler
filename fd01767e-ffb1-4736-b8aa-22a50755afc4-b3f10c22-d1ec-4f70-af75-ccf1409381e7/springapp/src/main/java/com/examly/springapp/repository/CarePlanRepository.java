package com.examly.springapp.repository;

import com.examly.springapp.model.CarePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CarePlanRepository extends JpaRepository<CarePlan, Long> {
    @Query("SELECT c FROM CarePlan c WHERE LOWER(REPLACE(c.plantType, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(?1, ' ', ''), '%'))")
    List<CarePlan> findByPlantTypeContainingIgnoreCase(String plantType);
}