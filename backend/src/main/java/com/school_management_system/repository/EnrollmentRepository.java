package com.school_management_system.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
// import org.springframework.data.repository.query.Param;
// import org.springframework.data.jpa.repository.Query;


import com.school_management_system.dto.TopCourseResponse;
import com.school_management_system.entity.Enrollment;
import com.school_management_system.entity.User;
import org.springframework.data.domain.Pageable;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
   
    long countByCourseId(Long courseId);

    long countByCreatedAtAfter(LocalDate date); 

    boolean existsByCourseId(Long courseId);

    List<Enrollment> findByStudentId(Long studentId);

    List<Enrollment> findByCourseId(Long courseId);

    boolean existsByStudent(User student);

    Optional<Enrollment> findByStudentIdAndCourseId(
        Long studentId,
        Long courseId
    );

    @Query("""
        SELECT new com.school_management_system.dto.TopCourseResponse(
            c.id,
            c.title,
            COUNT(e.id)
        )
        FROM Enrollment e
        JOIN e.course c
        GROUP BY c.id, c.title
        ORDER BY COUNT(e.id) DESC
        """)
    List<TopCourseResponse> findTopCourses(Pageable pageable);


    @Query("""
        SELECT e.createdAt, COUNT(e.id)
        FROM Enrollment e
        WHERE e.createdAt >= :startDate
        GROUP BY e.createdAt
        ORDER BY e.createdAt
    """)
    List<Object[]> getEnrollmentTrend(
        @Param("startDate") LocalDate startDate
    );
    // void deleteByStudentIdAndCourseId(
    //     Long studentId,
    //     Long courseId
    // );

    @Query("""
        SELECT COUNT(e)
        FROM Enrollment e
        WHERE e.createdAt >= :startDate
        AND e.createdAt < :endDate
    """)
    long countEnrollmentsByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );


   
    
}
