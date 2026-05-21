package com.school_management_system.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.auth.dto.AuthResponse;
import com.school_management_system.auth.dto.LoginRequest;
import com.school_management_system.auth.service.AuthService;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.dto.UserResponse;
import com.school_management_system.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public UserResponse register( @Valid @RequestBody UserRequest request ) {
        return userService.createUser(request);
    }

    @PostMapping("/login")
    public AuthResponse login( @Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}