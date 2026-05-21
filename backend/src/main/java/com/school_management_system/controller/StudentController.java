package com.school_management_system.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.auth.security.CustomUserDetails;
import com.school_management_system.dto.AttendanceResponse;
import com.school_management_system.dto.CourseResponse;
import com.school_management_system.dto.EnrollmentResponse;
import com.school_management_system.dto.GradeResponse;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.User;
import com.school_management_system.repository.AttendanceRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.GradeRepository;
import com.school_management_system.service.AttendanceService;
import com.school_management_system.service.EnrollmentService;
import com.school_management_system.service.GradeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final GradeService gradeService;
    private final AttendanceService attendanceService;
    private final EnrollmentService enrollmentService;

    @GetMapping("/me/grades")
    @PreAuthorize("hasRole('STUDENT')")
    public List<GradeResponse> getMyGrades(
            @AuthenticationPrincipal
            CustomUserDetails currentUser
    ) {

        User student = currentUser.getUser();

        return gradeService
                .getStudentGrades(student.getId());
    }

    @GetMapping("/me/attendance")
    @PreAuthorize("hasRole('STUDENT')")
    public List<AttendanceResponse> getMyAttendance(
            @AuthenticationPrincipal
            CustomUserDetails currentUser
    ) {

        User student = currentUser.getUser();

        return attendanceService
                .getStudentAttendance(student.getId());
    }

    @GetMapping("/me/courses")
    @PreAuthorize("hasRole('STUDENT')")
    public List<EnrollmentResponse> getMyCourses(
            @AuthenticationPrincipal
            CustomUserDetails currentUser
    ) {

        User student = currentUser.getUser();

        return enrollmentService
                .getStudentEnrollments(student.getId());
    }
}