package com.school_management_system.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;

public record EnrollStudentsRequest(
    @NotEmpty(message = "At least one student must be selected.")
    List<Long> studentIds
) {}
