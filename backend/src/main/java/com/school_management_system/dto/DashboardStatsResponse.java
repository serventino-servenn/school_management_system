package com.school_management_system.dto;

public record DashboardStatsResponse(
    StatMetric totalStudents,
    StatMetric totalTeachers,
    StatMetric totalCourses,
    StatMetric totalEnrollments
) {}
