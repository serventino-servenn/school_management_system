package com.school_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.school_management_system.entity.Grade;
import com.school_management_system.entity.User;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudentId(Long studentId);
    boolean existsByStudent(User student);
    boolean existsByCourseTeacher(User teacher);
}