package com.school_management_system.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.auth.dto.AuthResponse;
import com.school_management_system.auth.dto.LoginRequest;
import com.school_management_system.auth.service.AuthService;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.dto.RegistrationResponse;
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
    public ResponseEntity<RegistrationResponse> register( @Valid @RequestBody UserRequest request ) {
        RegistrationResponse response = userService.createUser(request);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login( @Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}