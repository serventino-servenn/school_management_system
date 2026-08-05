package com.school_management_system.mapper;

import org.springframework.stereotype.Component;

import com.school_management_system.dto.CourseResponse;
import com.school_management_system.entity.Course;

@Component
public class CourseMapper {
    
    public CourseResponse mapToCourseResponse(Course c) {
        CourseResponse r = new CourseResponse();

        r.id = c.getId();
        r.courseCode = c.getCourseCode();
        r.title = c.getTitle();
        r.description = c.getDescription();

        if (c.getTeacher() != null) {
                r.teacherId = c.getTeacher().getId();
                r.teacherName = c.getTeacher().getFirstName() + " "
                        + c.getTeacher().getLastName();
        }

        return r;
    }

}
