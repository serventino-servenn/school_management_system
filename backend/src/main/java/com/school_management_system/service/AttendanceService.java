package com.school_management_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.common.exception.UnauthorizedActionException;
import com.school_management_system.dto.AttendanceRequest;
import com.school_management_system.dto.AttendanceResponse;
import com.school_management_system.entity.Attendance;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.User;
import com.school_management_system.repository.AttendanceRepository;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AttendanceResponse markAttendance(
            AttendanceRequest request,
            User teacher
    ) {

        User student = userRepository.findById(
                request.studentId
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Student not found"
                )
        );

        Course course = courseRepository.findById(
                request.courseId
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Course not found"
                )
        );

        // Teacher ownership validation
        if (!course.getTeacher().getId().equals(
                teacher.getId()
        )) {

            throw new UnauthorizedActionException(
                    "You do not teach this course"
            );
        }

        // Enrollment validation
        boolean enrolled =
                enrollmentRepository
                        .existsByStudentIdAndCourseId(
                                student.getId(),
                                course.getId()
                        );

        if (!enrolled) {

            throw new IllegalStateException(
                    "Student is not enrolled in this course"
            );
        }

        Attendance attendance = Attendance.builder()
                .student(student)
                .teacher(teacher)
                .course(course)
                .attendanceDate(request.attendanceDate)
                .status(request.status)
                .remarks(request.remarks)
                .build();

        Attendance savedAttendance =
                attendanceRepository.save(attendance);

        return mapToResponse(savedAttendance);
    }

    public List<AttendanceResponse>
    getStudentAttendance(Long studentId) {

        return attendanceRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private AttendanceResponse mapToResponse( Attendance attendance) {

        AttendanceResponse response =
                new AttendanceResponse();

        response.id =
                attendance.getId();

        response.studentId =
                attendance.getStudent().getId();

        response.studentName =
                attendance.getStudent().getFirstName() + " " + attendance.getStudent().getLastName();

        response.teacherId =
                attendance.getTeacher().getId();

        response.teacherName =
                attendance.getTeacher().getFirstName() + " " + attendance.getTeacher().getLastName();

        response.courseId =
                attendance.getCourse().getId();

        response.courseTitle =
                attendance.getCourse().getTitle();

        response.attendanceDate =
                attendance.getAttendanceDate();

        response.status =
                attendance.getStatus();

        response.remarks =
                attendance.getRemarks();

        return response;
    }
}