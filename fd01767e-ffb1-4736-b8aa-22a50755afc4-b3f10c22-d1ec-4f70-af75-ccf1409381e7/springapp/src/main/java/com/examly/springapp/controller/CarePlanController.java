package com.examly.springapp.controller;

import com.examly.springapp.model.CarePlan;
import com.examly.springapp.service.CarePlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/careplan")
@CrossOrigin(origins = "*")
public class CarePlanController {
    
    @Autowired
    private CarePlanService carePlanService;
    
    @GetMapping("/suggest/{plantName}")
    public ResponseEntity<CarePlan> suggestCarePlan(@PathVariable String plantName) {
        Optional<CarePlan> carePlan = carePlanService.getSuggestion(plantName);
        return carePlan.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search/{plantName}")
    public ResponseEntity<List<CarePlan>> searchCarePlans(@PathVariable String plantName) {
        List<CarePlan> results = carePlanService.searchCarePlans(plantName);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/all")
    public List<CarePlan> getAllCarePlans() {
        return carePlanService.getAllCarePlans();
    }
    
    @GetMapping("/count")
    public ResponseEntity<String> getCarePlanCount() {
        long count = carePlanService.getCount();
        return ResponseEntity.ok("Total CarePlans: " + count);
    }
    
    @PostMapping
    public CarePlan createCarePlan(@RequestBody CarePlan carePlan) {
        return carePlanService.saveCarePlan(carePlan);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarePlan(@PathVariable Long id) {
        carePlanService.deleteCarePlan(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/init")
    public ResponseEntity<String> initializeCarePlans() {
        carePlanService.initializeSampleData();
        return ResponseEntity.ok("Sample CarePlans initialized. Total count: " + carePlanService.getCount());
    }
    
    @GetMapping("/init-data")
    public ResponseEntity<String> initData() {
        carePlanService.initializeSampleData();
        return ResponseEntity.ok("CarePlans initialized. Count: " + carePlanService.getCount());
    }
}