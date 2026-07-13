package com.school_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school_management_system.entity.Attendance;
import com.school_management_system.entity.User;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStudentId(Long studentId);
    boolean existsByStudent(User student);
    boolean existsByTeacher(User teacher);
}
