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

        seedUser(
                "System",
                "Admin",
                "admin@eduflow.com",
                "12345",
                Role.ADMIN
        );

        seedUser(
                "John",
                "Smith",
                "john.smith@eduflow.com",
                "12345",
                Role.TEACHER
        );

        seedUser(
                "Sarah",
                "Johnson",
                "sarah.johnson@eduflow.com",
                "12345",
                Role.TEACHER
        );

        seedUser(
                "Michael",
                "Brown",
                "michael.brown@student.eduflow.com",
                "12345",
                Role.STUDENT
        );

        seedUser(
                "Emma",
                "Wilson",
                "emma.wilson@student.eduflow.com",
                "12345",
                Role.STUDENT
        );

        seedUser(
                "Daniel",
                "Taylor",
                "daniel.taylor@student.eduflow.com",
                "12345",
                Role.STUDENT
        );
    }


    private void seedUser(
        String firstName,
        String lastName,
        String email,
        String password,
        Role role
    ) {

        if (userRepository.findByEmail(email).isPresent()) {
            return;
        }

        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();

        userRepository.save(user);

        log.info("{} account created: {}", role, email);
    }
}