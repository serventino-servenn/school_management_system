package com.school_management_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.common.exception.UnauthorizedActionException;
import com.school_management_system.dto.CourseRequest;
import com.school_management_system.dto.StudentSummaryResponse;
import com.school_management_system.dto.CourseDetailsResponse;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CourseDetailsResponse createCourse(CourseRequest request) {

        if (courseRepository.existsByCourseCode(request.courseCode)) {
            throw new IllegalStateException("Course code exists");
        }

        User teacher = userRepository.findById(request.teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        if (teacher.getRole() != Role.TEACHER) {
            throw new UnauthorizedActionException("User is not a teacher");
        }

        Course course = new Course();
        course.setCourseCode(request.courseCode);
        course.setTitle(request.title);
        course.setDescription(request.description);
        course.setTeacher(teacher);

        return mapToResponse(courseRepository.save(course));
    }
    //get all courses
    public List<CourseDetailsResponse> getAll() {
        return courseRepository.findAll()
        .stream()
        .map(this::mapToResponse)
        .toList();
    }

    //get course by ID
    public CourseDetailsResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        return mapToResponse(course);
    }

    private CourseDetailsResponse mapToResponse(Course course) {

        CourseDetailsResponse response = new CourseDetailsResponse();

        response.id = course.getId();
        response.courseCode = course.getCourseCode();
        response.title = course.getTitle();
        response.description = course.getDescription();

        // Instructor
        if (course.getTeacher() != null) {
            response.teacherId = course.getTeacher().getId();
            response.teacherName =
                    course.getTeacher().getFirstName()
                            + " "
                            + course.getTeacher().getLastName();
        }

        // Students
        List<StudentSummaryResponse> students =
                enrollmentRepository.findByCourseId(course.getId())
                        .stream()
                        .map(enrollment -> {

                            User student = enrollment.getStudent();

                            StudentSummaryResponse dto =
                                    new StudentSummaryResponse();

                            dto.id = student.getId();
                            dto.fullName =
                                    student.getFirstName()
                                            + " "
                                            + student.getLastName();
                            dto.email = student.getEmail();

                            return dto;
                        })
                        .toList();

        response.students = students;

        return response;
    }
}