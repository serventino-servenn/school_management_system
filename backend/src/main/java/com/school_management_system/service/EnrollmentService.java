package com.school_management_system.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.dto.EnrollmentRequest;
import com.school_management_system.dto.EnrollmentResponse;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.Enrollment;
import com.school_management_system.entity.User;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public EnrollmentResponse enroll(EnrollmentRequest request) {

        if (enrollmentRepository.existsByStudentIdAndCourseId(
                request.studentId, request.courseId)) {
            throw new IllegalStateException("Already enrolled");
        }

        User student = userRepository.findById(request.studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Course course = courseRepository.findById(request.courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Enrollment e = new Enrollment();
        e.setStudent(student);
        e.setCourse(course);
        e.setEnrolledAt(LocalDate.now());

        return map(enrollmentRepository.save(e));
    }
    public List<EnrollmentResponse> getStudentEnrollments( Long studentId ) {

        return enrollmentRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::map)
                .toList();
    }

    private EnrollmentResponse map(Enrollment e) {
        EnrollmentResponse r = new EnrollmentResponse();
        r.id = e.getId();
        r.studentId = e.getStudent().getId();
        r.studentName = e.getStudent().getName();
        r.courseId = e.getCourse().getId();
        r.courseTitle = e.getCourse().getTitle();
        r.enrolledAt = e.getEnrolledAt();
        return r;
    }
}
