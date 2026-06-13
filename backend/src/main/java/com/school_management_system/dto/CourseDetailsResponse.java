package com.school_management_system.dto;

import java.util.List;

public class CourseDetailsResponse {

    public Long id;

    public String courseCode;

    public String title;

    public String description;

    public Long teacherId;

    public String teacherName;

    public List<StudentSummaryResponse> students;
}