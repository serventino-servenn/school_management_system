package com.school_management_system.dto;



public record TopCourseResponse(

        Long courseId,
        String courseTitle,
        Long studentCount

) {}