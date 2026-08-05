package com.school_management_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.school_management_system.common.exception.InvalidEnrollmentException;
import com.school_management_system.common.exception.InvalidTeacherAssignmentException;
import com.school_management_system.common.exception.ResourceNotFoundException;
// import com.school_management_system.common.exception.UnauthorizedActionException;
// import com.school_management_system.dto.CourseRequest;
import com.school_management_system.dto.CourseResponse;
import com.school_management_system.dto.CreateCourseRequest;
import com.school_management_system.dto.StudentSummaryResponse;
import com.school_management_system.dto.CourseDetailsResponse;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.Enrollment;
import com.school_management_system.entity.Role;
// import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;

    public CourseResponse createCourse(CreateCourseRequest request) {

        if (courseRepository.existsByCourseCode(request.courseCode)) {
                throw new IllegalStateException(
                        "Course code already exists"
                );
        }

        Course course = new Course();

        applyCourseData(course, request);

        return mapToCourseResponse(courseRepository.save(course));
    }

    // Update an existing course
    public CourseResponse updateCourse(
        Long id,
        CreateCourseRequest request
    ) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course not found"
                        ));

        // Only validate uniqueness if the code changed
        if (!course.getCourseCode().equals(request.courseCode)
                && courseRepository.existsByCourseCode(request.courseCode)) {

                throw new IllegalStateException(
                        "Course code already exists"
                );
        }

        applyCourseData(course, request);

        return mapToCourseResponse(
                courseRepository.save(course)
        );
    }

    //get all courses
    public List<CourseResponse> getAll() {
        return courseRepository.findAll()
        .stream()
        .map(this::mapToCourseResponse)
        .toList();
    }

    //get course by ID
    public CourseDetailsResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        return mapToDetailsResponse(course);
    }

    public CourseResponse assignInstructor(Long courseId, Long teacherId) {
        
        Course course = courseRepository.findById(courseId)
        .orElseThrow(() ->
                new InvalidTeacherAssignmentException("Course not found."));
        
        User teacher = userRepository.findById(teacherId)
        .orElseThrow(() ->
                new InvalidTeacherAssignmentException("Teacher not found."));
        
        if (teacher.getRole() != Role.TEACHER) {
           throw new InvalidTeacherAssignmentException(
                "Selected user is not a teacher."
                );
        }

        if (!teacher.isActive()) {
                throw new InvalidTeacherAssignmentException(
                        "Cannot assign a deactivated teacher."
                );
        }

        course.setTeacher(teacher);

        courseRepository.save(course);

        return mapToCourseResponse(course);
    }

    // Remove the instructor from a course
     @Transactional
        public void removeStudentFromCourse(Long courseId, Long studentId) {

        courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found."));

        User student = userRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found."));

        if (student.getRole() != Role.STUDENT) {
                throw new InvalidEnrollmentException(
                        "Selected user is not a student."
                );
        }

        Enrollment enrollment = enrollmentRepository
                .findByStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student is not enrolled in this course."
                        ));

        enrollmentRepository.delete(enrollment);
 }
    
    private CourseDetailsResponse mapToDetailsResponse(Course course) {

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

    private void applyCourseData(
                Course course,
                CreateCourseRequest request
        ) {

                course.setCourseCode(request.courseCode);
                course.setTitle(request.title);
                course.setDescription(request.description);

                if (request.teacherId != null) {

                        User teacher = userRepository.findById(request.teacherId)
                                .orElseThrow(() ->
                                        new ResourceNotFoundException(
                                                "Teacher not found"
                                        ));

                        course.setTeacher(teacher);

                } else {

                        course.setTeacher(null);

                }
    }

    //DELETE course
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        
        if (enrollmentRepository.existsByCourseId(id)) {
                throw new IllegalStateException(
                        "Cannot delete course with enrolled students"
        );
    }

        courseRepository.delete(course);
    }

    private CourseResponse mapToCourseResponse(Course c) {
        CourseResponse r = new CourseResponse();

        r.id = c.getId();
        r.courseCode = c.getCourseCode();
        r.title = c.getTitle();
        r.description = c.getDescription();

        if (c.getTeacher() != null) {
                r.teacherId = c.getTeacher().getId();
                r.teacherName = c.getTeacher().getFirstName() + " "
                        + c.getTeacher().getLastName();
        }

        return r;
    }

    
}