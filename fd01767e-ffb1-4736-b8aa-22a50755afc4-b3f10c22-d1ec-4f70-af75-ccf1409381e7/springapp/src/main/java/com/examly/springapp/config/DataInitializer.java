package com.examly.springapp.config;

import com.examly.springapp.model.CarePlan;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.CarePlanRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CarePlanRepository carePlanRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeCarePlans();
    }
    
    private void initializeUsers() {
        System.out.println("Initializing User data...");
        
        if (userRepository.count() == 0) {
            System.out.println("No Users found. Adding sample data...");
            
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
            
            System.out.println("Successfully added " + userRepository.count() + " Users to database.");
        } else {
            System.out.println("Users already exist in database. Count: " + userRepository.count());
        }
    }
    
    private void initializeCarePlans() {
        System.out.println("Initializing CarePlan data...");
        
        if (carePlanRepository.count() == 0) {
            System.out.println("No CarePlans found. Adding sample data...");
            
            // Flowering Plants
            carePlanRepository.save(new CarePlan("Rose", 2, 6, 14, "Water early morning. Prune regularly. Remove dead flowers to encourage blooming."));
            carePlanRepository.save(new CarePlan("Marigold", 1, 8, 7, "Full sun required. Deadhead spent flowers. Water at soil level to prevent fungal issues."));
            carePlanRepository.save(new CarePlan("Lily", 3, 5, 21, "Keep soil moist but not waterlogged. Mulch around base to retain moisture."));
            carePlanRepository.save(new CarePlan("Sunflower", 2, 8, 10, "Needs full sun and well-draining soil. Support tall varieties with stakes."));
            carePlanRepository.save(new CarePlan("Tulip", 4, 6, 30, "Plant bulbs in fall. Water moderately during growing season."));
            
            // Succulents
            carePlanRepository.save(new CarePlan("Aloe Vera", 7, 4, 30, "Allow soil to dry between waterings. Bright indirect light. Great for healing cuts."));
            carePlanRepository.save(new CarePlan("Cactus", 14, 6, 60, "Water sparingly. Needs bright light and well-draining soil. Avoid overwatering."));
            carePlanRepository.save(new CarePlan("Jade Plant", 10, 4, 45, "Water when soil is dry. Bright indirect light. Pinch tips to encourage bushy growth."));
            
            // Indoor Plants
            carePlanRepository.save(new CarePlan("Snake Plant", 14, 2, 60, "Very low maintenance. Tolerates low light and infrequent watering."));
            carePlanRepository.save(new CarePlan("Pothos", 5, 3, 30, "Easy to grow. Thrives in low to medium light. Trim to control growth."));
            carePlanRepository.save(new CarePlan("Spider Plant", 4, 4, 21, "Bright indirect light. Remove plantlets to propagate new plants."));
            carePlanRepository.save(new CarePlan("Peace Lily", 3, 3, 21, "Prefers low to medium light. Drooping leaves indicate need for water."));
            
            // Herbs
            carePlanRepository.save(new CarePlan("Basil", 2, 6, 14, "Pinch flowers to keep leaves tender. Harvest regularly for best flavor."));
            carePlanRepository.save(new CarePlan("Mint", 2, 4, 21, "Grows aggressively. Consider container planting. Harvest before flowering."));
            carePlanRepository.save(new CarePlan("Rosemary", 7, 6, 30, "Drought tolerant once established. Prune after flowering."));
            
            // Vegetables
            carePlanRepository.save(new CarePlan("Tomato", 2, 8, 7, "Deep watering preferred. Support with stakes or cages. Prune suckers."));
            carePlanRepository.save(new CarePlan("Lettuce", 1, 4, 14, "Cool weather crop. Harvest outer leaves first. Provide afternoon shade in hot weather."));
            
            // Trees and Shrubs
            carePlanRepository.save(new CarePlan("Ficus", 5, 5, 30, "Bright indirect light. Wipe leaves regularly. Don't move frequently."));
            carePlanRepository.save(new CarePlan("Hibiscus", 2, 6, 14, "Loves heat and humidity. Prune in late winter. Deadhead spent blooms."));
            
            // Water Plants
            carePlanRepository.save(new CarePlan("Lotus", 1, 6, 14, "Requires water garden setup. Full sun. Remove dead leaves regularly."));
            carePlanRepository.save(new CarePlan("Water Lily", 1, 6, 21, "Needs still water and full sun. Divide every 3-4 years."));
            
            System.out.println("Successfully added " + carePlanRepository.count() + " CarePlans to database.");
        } else {
            System.out.println("CarePlans already exist in database. Count: " + carePlanRepository.count());
        }
    }
}