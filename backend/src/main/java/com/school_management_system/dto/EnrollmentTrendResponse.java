package com.school_management_system.dto;

public record EnrollmentTrendResponse(
        String month,
        Long enrollmentCount
) {
}