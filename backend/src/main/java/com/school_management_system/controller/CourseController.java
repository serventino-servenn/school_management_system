package com.school_management_system.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.dto.CourseRequest;
import com.school_management_system.dto.CourseResponse;
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
    public CourseResponse create(@RequestBody @Valid CourseRequest request) {
        return courseService.createCourse(request);
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<CourseResponse> getAll() {
        return courseService.getAll();
    }
}