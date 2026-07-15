package com.school_management_system.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.school_management_system.entity.Course;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CourseRepository courseRepository;

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

        // Seeding the three courses
                seedCourse(
                        "CS-101", 
                        "Introduction to Computer Science", 
                        "An introductory course covering foundational programming concepts, algorithms, and problem-solving using Java."
                );

                seedCourse(
                        "SE-204", 
                        "Web Application Development", 
                        "Learn how to build full-stack web applications using modern frameworks like Spring Boot and React."
                );

                seedCourse(
                        "DB-302", 
                        "Database Management Systems", 
                        "An in-depth look at relational database design, SQL querying, indexing, and transaction management."
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


  private void seedCourse(String courseCode, String title, String description) {
    // Uses your exact repository method to prevent duplicate inserts
    if (courseRepository.existsByCourseCode(courseCode)) {
        return;
    }

    Course course = new Course();
    course.setCourseCode(courseCode);
    course.setTitle(title);
    course.setDescription(description);
    // teacher is left null, and @CreationTimestamp handles the createdAt date

    courseRepository.save(course);
    log.info("Course created: {} - {}", courseCode, title);
}


}