package com.school_management_system.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

public class CourseRequest {

    @NotBlank(message = "Course code is required")
    public String courseCode;

    @NotBlank(message = "Title is required")
    public String title;

    public String description;

    @NotNull(message = "Teacher ID is required")
    public Long teacherId;
}
