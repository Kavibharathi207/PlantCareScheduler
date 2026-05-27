package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Plant;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.PlantRepository;

@Service
public class PlantService {
    @Autowired
    private PlantRepository plantRepository;
   
    public Plant create(Plant plant) {
        try {
            if (plant.getId() != null && plant.getId() <= 0) {
                plant.setId(null);
            }
            // Don't override the owner that was set in the controller
            return plantRepository.save(plant);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save plant: " + e.getMessage());
        }
    }
    
    public List<Plant> getPlantsByUsername(String username) {
        // For now, return all plants since we removed username tracking
        return plantRepository.findAll();
    }
   
    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }
    
    public List<Plant> getPlantsByOwner(User owner) {
        return plantRepository.findByOwner(owner);
    }
    
    public List<Plant> getGuestPlants() {
        return plantRepository.findByOwnerIsNull();
    }
   
    public Optional<Plant> getPlantById(Long id) {
        return plantRepository.findById(id);
    }
   
    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }

    public List<Plant> generateCarePlan(String method, User owner) {
        List<Plant> plants = owner != null ? getPlantsByOwner(owner) : getGuestPlants();
        
        if (method == null || (!method.equals("water") && !method.equals("sunlight"))) {
            return plants;
        }
        
        if (method.equals("water")) {
            plants.sort((p1, p2) -> p1.getWateringFrequency().compareTo(p2.getWateringFrequency()));
        } else if (method.equals("sunlight")) {
            plants.sort((p1, p2) -> p2.getSunlightHours().compareTo(p1.getSunlightHours()));
        }
        
        return plants;
    }
    
    public List<Plant> generateCarePlan(String method) {
        return generateCarePlan(method, null);
    }
}
