package com.examly.springapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "care_plans")
public class CarePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String plantType;
    private int wateringFrequency;
    private int sunlightHours;
    private int fertilizingFrequency;
    private String tips;
    
    public CarePlan() {}
    
    public CarePlan(String plantType, int wateringFrequency, int sunlightHours, int fertilizingFrequency, String tips) {
        this.plantType = plantType;
        this.wateringFrequency = wateringFrequency;
        this.sunlightHours = sunlightHours;
        this.fertilizingFrequency = fertilizingFrequency;
        this.tips = tips;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPlantType() { return plantType; }
    public void setPlantType(String plantType) { this.plantType = plantType; }
    
    public int getWateringFrequency() { return wateringFrequency; }
    public void setWateringFrequency(int wateringFrequency) { this.wateringFrequency = wateringFrequency; }
    
    public int getSunlightHours() { return sunlightHours; }
    public void setSunlightHours(int sunlightHours) { this.sunlightHours = sunlightHours; }
    
    public int getFertilizingFrequency() { return fertilizingFrequency; }
    public void setFertilizingFrequency(int fertilizingFrequency) { this.fertilizingFrequency = fertilizingFrequency; }
    
    public String getTips() { return tips; }
    public void setTips(String tips) { this.tips = tips; }
}