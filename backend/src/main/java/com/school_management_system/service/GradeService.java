package com.school_management_system.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.common.exception.UnauthorizedActionException;
import com.school_management_system.dto.GradeRequest;
import com.school_management_system.dto.GradeResponse;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.Grade;
import com.school_management_system.entity.User;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.GradeRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GradeService {

    private final GradeRepository gradeRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public GradeResponse createGrade(
            GradeRequest request,
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

        // Validate teacher owns course
        if (!course.getTeacher().getId().equals(
                teacher.getId()
        )) {

            throw new UnauthorizedActionException(
                    "You do not teach this course"
            );
        }

        // Validate enrollment
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

        Grade grade = new Grade();

        grade.setStudent(student);
        grade.setCourse(course);
        grade.setAssessmentName(
                request.assessmentName
        );
        grade.setScore(request.score);
        grade.setMaxScore(request.maxScore);
        grade.setGradedAt(LocalDate.now());

        Grade savedGrade =
                gradeRepository.save(grade);

        return mapToResponse(savedGrade);
    }

    public List<GradeResponse> getStudentGrades(
            Long studentId
    ) {

        return gradeRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private GradeResponse mapToResponse(Grade grade ) {

        GradeResponse response = new GradeResponse();
         response.id = grade.getId();
        response.studentId = grade.getStudent().getId();
        response.studentName = grade.getStudent().getFirstName() + " " + grade.getStudent().getLastName();      
        response.courseId = grade.getCourse().getId();
        response.courseTitle = grade.getCourse().getTitle();
        response.assessmentName = grade.getAssessmentName();
        response.score = grade.getScore();
        response.maxScore = grade.getMaxScore();
        response.gradedAt = grade.getGradedAt();
        return response;
    }
}