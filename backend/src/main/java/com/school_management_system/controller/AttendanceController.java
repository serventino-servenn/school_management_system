package com.school_management_system.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.school_management_system.auth.security.CustomUserDetails;
import com.school_management_system.dto.AttendanceRequest;
import com.school_management_system.dto.AttendanceResponse;
import com.school_management_system.entity.User;
import com.school_management_system.service.AttendanceService;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
      public AttendanceResponse markAttendance(
            @Valid @RequestBody AttendanceRequest request,
            @AuthenticationPrincipal
            CustomUserDetails currentUser
    ) {

        User teacher = currentUser.getUser();

        return attendanceService
                .markAttendance(request, teacher);
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize(
            "hasAnyRole('ADMIN', 'TEACHER')"
    )
    public List<AttendanceResponse>
    getStudentAttendance(
            @PathVariable Long studentId
    ) {
        return attendanceService
                .getStudentAttendance(studentId);
    }
}
