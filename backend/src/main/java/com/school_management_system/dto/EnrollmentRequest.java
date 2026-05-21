package com.school_management_system.dto;

import jakarta.validation.constraints.NotNull;

public class EnrollmentRequest {

    @NotNull
    public Long studentId;

    @NotNull
    public Long courseId;
}