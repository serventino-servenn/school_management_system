package com.school_management_system.dto;

import java.time.LocalDate;

public class GradeResponse {

    public Long id;

    public Long studentId;
    public String studentName;

    public Long courseId;
    public String courseTitle;

    public String assessmentName;

    public Double score;

    public Double maxScore;

    public LocalDate gradedAt;
}