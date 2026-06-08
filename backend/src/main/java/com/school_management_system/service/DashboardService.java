package com.school_management_system.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.school_management_system.dto.DashboardStats;
import com.school_management_system.dto.DashboardStats.StatMetric;
import com.school_management_system.entity.Role;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor // Lombok automatically creates the constructor for dependency injection
public class DashboardService {

    // These final fields will be automatically injected by Spring via Lombok's constructor
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public DashboardStats getDashboardStats() {
        log.info("Fetching dashboard metrics data");

        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);

        // 1. Fetch Student Metrics (Filtered by Role Enum)
        long totalStudents = userRepository.countByRole(Role.STUDENT.name());
        long newStudents = userRepository.countByRoleAndCreatedAtAfter(Role.STUDENT.name(), oneWeekAgo);
        StatMetric studentsDetail = new StatMetric(totalStudents, "+" + newStudents + " this week");

        // 2. Fetch Teacher Metrics (Filtered by Role Enum)
        long totalTeachers = userRepository.countByRole(Role.TEACHER.name());
        long newTeachers = userRepository.countByRoleAndCreatedAtAfter(Role.TEACHER.name(), oneMonthAgo);
        StatMetric teachersDetail = new StatMetric(totalTeachers, "+" + newTeachers + " this month");

        // 3. Fetch Course Metrics
        long totalCourses = courseRepository.count();
        long newCourses = courseRepository.countByCreatedAtAfter(oneMonthAgo); 
        StatMetric coursesDetail = new StatMetric(totalCourses, "+" + newCourses + " new courses");

        // 4. Fetch Enrollment Metrics
        long totalEnrollments = enrollmentRepository.count();
        long newEnrollments = enrollmentRepository.countByCreatedAtAfter(oneMonthAgo); // Adjust method name if using enrollmentDateAfter
        StatMetric enrollmentsDetail = new StatMetric(totalEnrollments, "+" + newEnrollments + " this month");

        return new DashboardStats(studentsDetail, teachersDetail, coursesDetail, enrollmentsDetail);
    }
}

