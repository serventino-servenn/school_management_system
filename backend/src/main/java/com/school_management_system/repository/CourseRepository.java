package com.school_management_system.repository;

import java.time.LocalDate;


import org.springframework.data.jpa.repository.JpaRepository;
import com.school_management_system.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseCode(String courseCode);
     long countByCreatedAtAfter(LocalDate dateTime);
     
}