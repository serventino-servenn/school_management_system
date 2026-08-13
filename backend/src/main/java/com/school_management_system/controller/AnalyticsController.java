package com.school_management_system.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.dto.CourseDistributionResponse;
import com.school_management_system.dto.EnrollmentTrendResponse;
import com.school_management_system.dto.TopCourseResponse;
import com.school_management_system.dto.UserDistributionResponse;
import com.school_management_system.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/top-courses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TopCourseResponse>> getTopCourses() {

        return ResponseEntity.ok(
                analyticsService.getTopCourses()
        );

    }

    @GetMapping("/user-distribution")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDistributionResponse>> getUserDistribution() {

        return ResponseEntity.ok(
                analyticsService.getUserDistribution()
        );
    }

    @GetMapping("/course-distribution")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CourseDistributionResponse>> getCourseDistribution() {

        return ResponseEntity.ok(
                analyticsService.getCourseDistribution()
        );
    }

    @GetMapping("/enrollment-trend")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EnrollmentTrendResponse>> getEnrollmentTrend() {

        return ResponseEntity.ok(
                analyticsService.getEnrollmentTrend()
        );
    }

}
