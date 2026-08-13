package com.school_management_system.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school_management_system.dto.CourseDistributionResponse;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.User;

public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseCode(String courseCode);
     long countByCreatedAtAfter(LocalDate dateTime);
    //  long countByRole(Role role);
     boolean existsByTeacher(User teacher);     
    //  Course findByCourseCode(String courseCode);

    @Query("""
    SELECT new com.school_management_system.dto.CourseDistributionResponse(
            c.title,
            COUNT(e.id)
        )
        FROM Course c
        LEFT JOIN Enrollment e ON e.course.id = c.id
        GROUP BY c.id, c.title
        ORDER BY COUNT(e.id) DESC
    """)
    List<CourseDistributionResponse> getCourseDistribution();

    @Query("""
        SELECT COUNT(c)
        FROM Course c
        WHERE c.createdAt >= :startDate
        AND c.createdAt < :endDate
    """)
    long countCoursesByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}