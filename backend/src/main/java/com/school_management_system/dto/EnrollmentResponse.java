package com.school_management_system.dto;

import java.time.LocalDate;

public class EnrollmentResponse {

    public Long id;

    public Long studentId;
    public String studentName;

    public Long courseId;
    public String courseTitle;

    public LocalDate enrolledAt;
}
