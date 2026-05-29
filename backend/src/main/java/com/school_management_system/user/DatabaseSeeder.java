package com.school_management_system.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@eduflow.com";

        // 1. Check if an admin already exists to prevent duplicate entries
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            log.info("No system administrator found. Seeding default admin account...");

            // 2. Create the seeded admin entity
            User admin =  User.builder()
                    .firstName("System")
                    .lastName("Admin")
                    .email(adminEmail)
                    .password(passwordEncoder.encode("12345")) 
                    .role(Role.ADMIN)
                    .build();

            // 4. Persist to database
            userRepository.save(admin);
            log.info("Default admin account successfully created with email: {}", adminEmail);
        } else {
            log.info("Admin account already exists. Skipping database seeding.");
        }
    }
}