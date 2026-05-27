package com.examly.springapp.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.model.Plant;
import com.examly.springapp.model.User;
import com.examly.springapp.service.PlantService;
import com.examly.springapp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.ExampleObject;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "*")
public class PlantController {

    @Autowired
    private PlantService plantService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    @Operation(summary = "Create a new plant", 
               requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                   content = @Content(schema = @Schema(implementation = Plant.class),
                   examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                       value = "{\"plantName\":\"Rose\",\"wateringFrequency\":2,\"sunlightHours\":6,\"fertilizingFrequency\":14,\"lastWateredDate\":\"2025-10-11\"}"
                   ))))
    @ApiResponse(responseCode = "201", description = "Plant created successfully", 
                content = @Content(schema = @Schema(implementation = Plant.class)))

    public ResponseEntity<Plant> postPlant(@RequestBody Map<String, Object> plantData) {
        try {
            Plant plant = new Plant();
            
            // Handle both 'name' and 'plantName' fields
            String name = (String) plantData.get("name");
            if (name == null) name = (String) plantData.get("plantName");
            if (name == null || name.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            plant.setPlantName(name);
            
            // Handle wateringFrequency as string or number
            Object wateringFreq = plantData.get("wateringFrequency");
            if (wateringFreq instanceof Number) {
                plant.setWateringFrequency(((Number) wateringFreq).longValue());
            } else if (wateringFreq instanceof String && !((String) wateringFreq).isEmpty()) {
                try {
                    plant.setWateringFrequency(Long.parseLong((String) wateringFreq));
                } catch (NumberFormatException e) {
                    plant.setWateringFrequency(1L); // Default to 1 if parsing fails
                }
            } else {
                plant.setWateringFrequency(1L);
            }
            
            // Handle sunlightHours
            Object sunlightHours = plantData.get("sunlightHours");
            if (sunlightHours instanceof Number) {
                plant.setSunlightHours(((Number) sunlightHours).longValue());
            } else if (sunlightHours instanceof String && !((String) sunlightHours).isEmpty()) {
                try {
                    plant.setSunlightHours(Long.parseLong((String) sunlightHours));
                } catch (NumberFormatException e) {
                    plant.setSunlightHours(6L); // Default to 6 if parsing fails
                }
            } else {
                plant.setSunlightHours(6L);
            }
            
            // Handle fertilizingFrequency
            Object fertilizingFreq = plantData.get("fertilizingFrequency");
            if (fertilizingFreq instanceof Number) {
                plant.setFertilizingFrequency(((Number) fertilizingFreq).longValue());
            } else if (fertilizingFreq instanceof String && !((String) fertilizingFreq).isEmpty()) {
                try {
                    plant.setFertilizingFrequency(Long.parseLong((String) fertilizingFreq));
                } catch (NumberFormatException e) {
                    plant.setFertilizingFrequency(30L); // Default to 30 if parsing fails
                }
            } else {
                plant.setFertilizingFrequency(30L);
            }
            
            // Handle lastWateredDate
            String lastWatered = (String) plantData.get("lastWateredDate");
            if (lastWatered != null && !lastWatered.isEmpty()) {
                plant.setLastWateredDate(java.time.LocalDate.parse(lastWatered));
            }
            
            // Assign plant to user if createdBy is provided
            String createdBy = (String) plantData.get("createdBy");
            if (createdBy != null) {
                // Store createdBy as a simple field for user-specific filtering
                // For simplicity, we'll use the plant name to include user info
                plant.setPlantName(plant.getPlantName() + "_" + createdBy);
            }
            plant.setOwner(null);
            
            // Ensure ID is null for auto-generation
            plant.setId(null);
            
            Plant createdPlant = plantService.create(plant);
            
            // Verify ID was auto-generated
            if (createdPlant.getId() == null) {
                return ResponseEntity.status(500).build();
            }
            
            URI location = URI.create("/api/plants/" + createdPlant.getId());
            return ResponseEntity.created(location).body(createdPlant);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Plant>> getAll(@RequestParam(required = false) Long userId) {
        try {
            return ResponseEntity.ok(plantService.getAllPlants());
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }
    

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing plant",
               requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                   content = @Content(schema = @Schema(implementation = Plant.class),
                   examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                       value = "{\"plantName\":\"Updated Rose\",\"wateringFrequency\":3,\"sunlightHours\":7,\"fertilizingFrequency\":15,\"lastWateredDate\":\"2025-10-11\"}"
                   ))))
    public ResponseEntity<Plant> updatePlant(@PathVariable Long id, @RequestBody Map<String, Object> plantData) {
        try {
            Optional<Plant> existing = plantService.getPlantById(id);
            if (existing.isPresent()) {
                Plant plant = existing.get();
                
                // Update fields from request data
                String name = (String) plantData.get("name");
                if (name == null) name = (String) plantData.get("plantName");
                if (name != null && !name.trim().isEmpty()) {
                    plant.setPlantName(name);
                }
                
                Object wateringFreq = plantData.get("wateringFrequency");
                if (wateringFreq != null) {
                    if (wateringFreq instanceof Number) {
                        plant.setWateringFrequency(((Number) wateringFreq).longValue());
                    } else if (wateringFreq instanceof String && !((String) wateringFreq).isEmpty()) {
                        try {
                            plant.setWateringFrequency(Long.parseLong((String) wateringFreq));
                        } catch (NumberFormatException e) {
                            // Keep existing value if parsing fails
                        }
                    }
                }
                
                Object sunlightHours = plantData.get("sunlightHours");
                if (sunlightHours != null) {
                    if (sunlightHours instanceof Number) {
                        plant.setSunlightHours(((Number) sunlightHours).longValue());
                    } else if (sunlightHours instanceof String && !((String) sunlightHours).isEmpty()) {
                        try {
                            plant.setSunlightHours(Long.parseLong((String) sunlightHours));
                        } catch (NumberFormatException e) {
                            // Keep existing value if parsing fails
                        }
                    }
                }
                
                Object fertilizingFreq = plantData.get("fertilizingFrequency");
                if (fertilizingFreq != null) {
                    if (fertilizingFreq instanceof Number) {
                        plant.setFertilizingFrequency(((Number) fertilizingFreq).longValue());
                    } else if (fertilizingFreq instanceof String && !((String) fertilizingFreq).isEmpty()) {
                        try {
                            plant.setFertilizingFrequency(Long.parseLong((String) fertilizingFreq));
                        } catch (NumberFormatException e) {
                            // Keep existing value if parsing fails
                        }
                    }
                }
                
                String lastWatered = (String) plantData.get("lastWateredDate");
                if (lastWatered != null && !lastWatered.isEmpty()) {
                    plant.setLastWateredDate(java.time.LocalDate.parse(lastWatered));
                }
                
                Plant updatedPlant = plantService.create(plant);
                return ResponseEntity.ok(updatedPlant);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        Optional<Plant> existing = plantService.getPlantById(id);
        if (existing.isPresent()) {
            plantService.deletePlant(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/plan")
    public ResponseEntity<List<Plant>> getCarePlan(@RequestParam(required = false) String method) {
        try {
            List<Plant> plants = plantService.generateCarePlan(method);
            return ResponseEntity.ok(plants);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }
}

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/checkUser")
    @Operation(summary = "Check if user exists",
               requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                   content = @Content(examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                       value = "{\"username\":\"testuser\"}"
                   ))))
    public ResponseEntity<Map<String, Object>> checkUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        
        if (username != null && userService.existsByUsername(username)) {
            Optional<User> userOpt = userService.getUserByUsername(username);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                return ResponseEntity.ok(Map.of(
                    "isExisting", true,
                    "redirectTo", "/dashboard",
                    "user", Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "role", user.getRole().toString()
                    )
                ));
            }
        }
        
        return ResponseEntity.ok(Map.of(
            "isExisting", false,
            "redirectTo", "/welcome"
        ));
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user",
               requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                   content = @Content(examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                       value = "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\",\"role\":\"USER\"}"
                   ))))
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        try {
            User user = new User();
            user.setUsername(request.get("username"));
            user.setEmail(request.get("email"));
            user.setPassword(request.get("password"));
            user.setRole(User.Role.valueOf(request.getOrDefault("role", "USER")));
            
            User savedUser = userService.saveUser(user);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "isNewUser", true,
                "redirectTo", "/welcome",
                "user", Map.of(
                    "username", savedUser.getUsername(),
                    "role", savedUser.getRole().toString()
                )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Registration failed"
            ));
        }
    }
}
