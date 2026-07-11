package com.school_management_system.controller;



import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.dto.UserResponse;
import com.school_management_system.dto.UserUpdateRequest;
import com.school_management_system.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserResponse> getAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
    ) {
        // System.out.println("Fetching users with page: " + page + " and size: " + size);
        return userService.getAllUsers(page, size);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

   @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse toggleUserStatus(@PathVariable Long id) {
        return userService.toggleUserStatus(id);
    }
        

    @GetMapping("/public")
    public String publicEndpoint() {
        return "Public endpoint accessible to everyone";
    }

    @GetMapping("/profile")
    public String profile() {
        return "Protected profile endpoint";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminEndpoint() {
        return "Admin access granted";
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasRole('TEACHER')")
    public String teacherEndpoint() {
        return "Teacher access granted";
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public String studentEndpoint() {
        return "Student access granted";
    }
}
