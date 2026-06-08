package com.school_management_system.dto;



public record DashboardStats(
    StatMetric totalStudents,
    StatMetric totalTeachers,
    StatMetric totalCourses,
    StatMetric totalEnrollments
) {
    public record StatMetric(Long total, String change) {}
}
