package com.school_management_system.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school_management_system.entity.Course;

@Repository 
public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseCode(String courseCode);
     long countByCreatedAtAfter(LocalDateTime dateTime);
}