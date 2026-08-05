package com.school_management_system.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school_management_system.entity.Enrollment;
import com.school_management_system.entity.User;

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

    // void deleteByStudentIdAndCourseId(
    //     Long studentId,
    //     Long courseId
    // );


   
    
}
