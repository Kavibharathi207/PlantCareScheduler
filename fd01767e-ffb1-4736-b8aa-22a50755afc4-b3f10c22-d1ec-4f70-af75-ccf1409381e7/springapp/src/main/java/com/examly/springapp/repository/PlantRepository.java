package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.Plant;
import com.examly.springapp.model.User;
import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByOwner(User owner);
    List<Plant> findByOwnerIsNull(); // For guest/public plants
}
