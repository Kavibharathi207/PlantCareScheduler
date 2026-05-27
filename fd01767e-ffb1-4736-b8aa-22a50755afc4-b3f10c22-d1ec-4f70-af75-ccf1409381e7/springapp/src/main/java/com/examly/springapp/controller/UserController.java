package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/users/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            if (userService.existsByUsername(user.getUsername())) {
                return ResponseEntity.badRequest().body("Username already exists");
            }
            if (userService.existsByEmail(user.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists");
            }
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
    

    
    @GetMapping("/api/users/guests")
    public List<User> getGuestUsers() {
        return userService.getGuestUsers();
    }
    
    @GetMapping("/api/users/count")
    public ResponseEntity<String> getUserCount() {
        return ResponseEntity.ok("Total Users: " + userService.getTotalUsers());
    }
    
    @PostMapping("/api/users/init")
    public ResponseEntity<String> initializeUsers() {
        userService.initializeSampleUsers();
        return ResponseEntity.ok("Sample users initialized. Total count: " + userService.getTotalUsers());
    }
}
