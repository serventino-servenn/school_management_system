package com.school_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school_management_system.entity.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
    List<Enrollment> findByStudentId(Long studentId);
    
}
