package com.school_management_system.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class GradeRequest {

    @NotNull
    public Long studentId;

    @NotNull
    public Long courseId;

    @NotBlank
    public String assessmentName;

    @NotNull
    public Double score;

    @NotNull
    public Double maxScore;
}