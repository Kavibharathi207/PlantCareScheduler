package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "plants")
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String plantName;
    
    private Long wateringFrequency;
    private Long sunlightHours;
    private Long fertilizingFrequency;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "user_id", nullable = true, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private User owner;
    
    private LocalDate lastWateredDate;
    private LocalDateTime createdAt = LocalDateTime.now();
    
    public Plant() {}
    
    public Plant(String plantName, Long wateringFrequency, Long sunlightHours, Long fertilizingFrequency) {
        this.plantName = plantName;
        this.wateringFrequency = wateringFrequency;
        this.sunlightHours = sunlightHours;
        this.fertilizingFrequency = fertilizingFrequency;
    }
    
    public Plant(String plantName, int wateringFrequency, int sunlightHours, int fertilizingFrequency) {
        this.plantName = plantName;
        this.wateringFrequency = Long.valueOf(wateringFrequency);
        this.sunlightHours = Long.valueOf(sunlightHours);
        this.fertilizingFrequency = Long.valueOf(fertilizingFrequency);
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPlantName() { return plantName; }
    public void setPlantName(String plantName) { this.plantName = plantName; }
    
    public Long getWateringFrequency() { return wateringFrequency; }
    public void setWateringFrequency(Long wateringFrequency) { this.wateringFrequency = wateringFrequency; }
    
    public Long getSunlightHours() { return sunlightHours; }
    public void setSunlightHours(Long sunlightHours) { this.sunlightHours = sunlightHours; }
    
    public Long getFertilizingFrequency() { return fertilizingFrequency; }
    public void setFertilizingFrequency(Long fertilizingFrequency) { this.fertilizingFrequency = fertilizingFrequency; }
    
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
    
    public LocalDate getLastWateredDate() { return lastWateredDate; }
    public void setLastWateredDate(LocalDate lastWateredDate) { this.lastWateredDate = lastWateredDate; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
