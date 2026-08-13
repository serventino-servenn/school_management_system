package com.school_management_system.service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.school_management_system.dto.CourseDistributionResponse;
import com.school_management_system.dto.DashboardStats;
import com.school_management_system.dto.EnrollmentTrendResponse;
import com.school_management_system.dto.TopCourseResponse;
import com.school_management_system.dto.UserDistributionResponse;
import com.school_management_system.entity.Role;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public List<TopCourseResponse> getTopCourses() {

        return enrollmentRepository.findTopCourses(
                PageRequest.of(0, 5)
        );

    }

    public List<UserDistributionResponse> getUserDistribution() {

        return userRepository.getUserDistribution();

    }

    public List<CourseDistributionResponse> getCourseDistribution() {

        return courseRepository.getCourseDistribution();

    }

    public List<EnrollmentTrendResponse> getEnrollmentTrend() {

        LocalDate startDate = LocalDate.now()
                .minusMonths(5)
                .withDayOfMonth(1);

        List<Object[]> results =
                enrollmentRepository.getEnrollmentTrend(startDate);

        Map<String, Long> monthlyTotals = new LinkedHashMap<>();

        for (Object[] result : results) {

            LocalDate date = (LocalDate) result[0];
            Long count = (Long) result[1];

            String month = date.getMonth()
                    .getDisplayName(
                            TextStyle.SHORT,
                            Locale.ENGLISH
                    );

            monthlyTotals.merge(
                    month,
                    count,
                    Long::sum
            );
        }

        return monthlyTotals.entrySet()
                .stream()
                .map(entry ->
                        new EnrollmentTrendResponse(
                                entry.getKey(),
                                entry.getValue()
                        )
                )
                .toList();
    }

    public DashboardStats getDashboardStats() {

        LocalDate currentMonthStart = LocalDate.now()
                .withDayOfMonth(1);

        LocalDate nextMonthStart = currentMonthStart
                .plusMonths(1);

        LocalDate previousMonthStart = currentMonthStart
                .minusMonths(1);

        // Students
        long currentStudents =
                userRepository.countUsersByRoleAndDateRange(
                        Role.STUDENT,
                        currentMonthStart,
                        nextMonthStart
                );

        long previousStudents =
                userRepository.countUsersByRoleAndDateRange(
                        Role.STUDENT,
                        previousMonthStart,
                        currentMonthStart
                );

        // Teachers
        long currentTeachers =
                userRepository.countUsersByRoleAndDateRange(
                        Role.TEACHER,
                        currentMonthStart,
                        nextMonthStart
                );

        long previousTeachers =
                userRepository.countUsersByRoleAndDateRange(
                        Role.TEACHER,
                        previousMonthStart,
                        currentMonthStart
                );

        // Courses
        long currentCourses =
                courseRepository.countCoursesByDateRange(
                        currentMonthStart,
                        nextMonthStart
                );

        long previousCourses =
                courseRepository.countCoursesByDateRange(
                        previousMonthStart,
                        currentMonthStart
                );

        // Enrollments
        long currentEnrollments =
                enrollmentRepository.countEnrollmentsByDateRange(
                        currentMonthStart,
                        nextMonthStart
                );

        long previousEnrollments =
                enrollmentRepository.countEnrollmentsByDateRange(
                        previousMonthStart,
                        currentMonthStart
                );

        return new DashboardStats(
                new DashboardStats.StatMetric(
                        userRepository.countByRole(Role.STUDENT),
                        calculateChange(currentStudents, previousStudents)
                ),

                new DashboardStats.StatMetric(
                        userRepository.countByRole(Role.TEACHER),
                        calculateChange(currentTeachers, previousTeachers)
                ),

                new DashboardStats.StatMetric(
                        courseRepository.count(),
                        calculateChange(currentCourses, previousCourses)
                ),

                new DashboardStats.StatMetric(
                        enrollmentRepository.count(),
                        calculateChange(currentEnrollments, previousEnrollments)
                )
        );
    }

    private String calculateChange(long current, long previous) {

        if (previous == 0) {
            return null;
        }

        double percentage =
                ((double) (current - previous) / previous) * 100;

        return String.format(
                "%+.0f%%",
                percentage
        );
}

}
