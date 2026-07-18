package com.school_management_system.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.school_management_system.dto.CourseResponse;
import com.school_management_system.dto.CreateCourseRequest;
import com.school_management_system.dto.CourseDetailsResponse;
import com.school_management_system.service.CourseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<CourseResponse> create(@RequestBody @Valid CreateCourseRequest request) {
        System.err.println("Creating course: " + request.title);
        return ResponseEntity.ok(courseService.createCourse(request));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<CourseResponse> getAll() {
        return courseService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseDetailsResponse> getCourseById( @PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<CourseResponse> update(@PathVariable Long id, @RequestBody @Valid CreateCourseRequest request) {
        return ResponseEntity.ok(courseService.updateCourse(id, request));
    }

    @PutMapping("/{courseId}/instructor/{teacherId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CourseResponse> assignInstructor(
            @PathVariable Long courseId,
            @PathVariable Long teacherId) {

        CourseResponse response =
                courseService.assignInstructor(courseId, teacherId);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}