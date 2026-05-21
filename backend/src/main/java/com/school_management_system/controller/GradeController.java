package com.school_management_system.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.auth.security.CustomUserDetails;
import com.school_management_system.dto.GradeRequest;
import com.school_management_system.dto.GradeResponse;
import com.school_management_system.entity.User;
import com.school_management_system.service.GradeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService gradeService;

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public GradeResponse createGrade(
            @RequestBody @Valid GradeRequest request,
            @AuthenticationPrincipal
            CustomUserDetails currentUser
    ) {

        User teacher = currentUser.getUser();

        return gradeService.createGrade(
                request,
                teacher
        );
    }
}