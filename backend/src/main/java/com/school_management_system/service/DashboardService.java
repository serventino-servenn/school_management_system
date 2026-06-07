package com.school_management_system.service;


import org.springframework.stereotype.Service;

import com.school_management_system.dto.DashboardStatsResponse;
import com.school_management_system.dto.StatMetric;
import com.school_management_system.repository.DashboardRepository;

import java.util.List;

@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public DashboardService(DashboardRepository dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    public DashboardStatsResponse getDashboardStats() {
        List<Object[]> results = dashboardRepository.fetchGlobalCounts();
        
        long students = 0;
        long teachers = 0;
        long courses = 0;
        long enrollments = 0;

        if (results != null && !results.isEmpty()) {
            Object[] row = results.get(0);
            students = ((Number) row[0]).longValue();
            teachers = ((Number) row[1]).longValue();
            courses = ((Number) row[2]).longValue();
            enrollments = ((Number) row[3]).longValue();
        }

        return new DashboardStatsResponse(
            new StatMetric(students, "+12 this week"),
            new StatMetric(teachers, "+1 this month"),
            new StatMetric(courses, "3 new courses"),
            new StatMetric(enrollments, "+28 this month")
        );
    }
}
