package com.school_management_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.common.exception.UnauthorizedActionException;
import com.school_management_system.dto.CourseRequest;
import com.school_management_system.dto.CourseResponse;
import com.school_management_system.entity.Course;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseResponse createCourse(CourseRequest request) {

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

        return map(courseRepository.save(course));
    }

    public List<CourseResponse> getAll() {
        return courseRepository.findAll()
                .stream().map(this::map).toList();
    }

    private CourseResponse map(Course c) {
        CourseResponse r = new CourseResponse();
        r.id = c.getId();
        r.courseCode = c.getCourseCode();
        r.title = c.getTitle();
        r.description = c.getDescription();
        r.teacherId = c.getTeacher().getId();
        r.teacherName = c.getTeacher().getName();
        return r;
    }
}