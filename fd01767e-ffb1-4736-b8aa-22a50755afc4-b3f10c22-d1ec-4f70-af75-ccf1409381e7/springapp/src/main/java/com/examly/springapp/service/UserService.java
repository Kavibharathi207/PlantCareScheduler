package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User saveUser(User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        if (user.getRole() == null) {
            user.setRole(User.Role.USER);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public Optional<User> authenticate(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
    
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public void deactivateUser(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setActive(false);
            userRepository.save(user);
        }
    }
    
    public long getTotalUsers() {
        return userRepository.count();
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public List<User> getGuestUsers() {
        return userRepository.findByRole(User.Role.GUEST);
    }
    
    public void initializeSampleUsers() {
        if (userRepository.count() == 0) {
            // Admin user
            User admin = new User("admin", passwordEncoder.encode("admin123"), "admin@plantcare.com", User.Role.ADMIN);
            userRepository.save(admin);
            
            // Regular users
            User user1 = new User("john_doe", passwordEncoder.encode("password123"), "john@example.com", User.Role.USER);
            User user2 = new User("jane_smith", passwordEncoder.encode("password123"), "jane@example.com", User.Role.USER);
            userRepository.save(user1);
            userRepository.save(user2);
            
            // Guest users
            User guest1 = new User("guest1", passwordEncoder.encode("guest123"), "guest1@example.com", User.Role.GUEST);
            User guest2 = new User("guest2", passwordEncoder.encode("guest123"), "guest2@example.com", User.Role.GUEST);
            User guest3 = new User("demo_user", passwordEncoder.encode("demo123"), "demo@example.com", User.Role.GUEST);
            userRepository.save(guest1);
            userRepository.save(guest2);
            userRepository.save(guest3);
        }
    }
}
