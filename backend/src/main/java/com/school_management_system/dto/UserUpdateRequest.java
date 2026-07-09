package com.school_management_system.dto;

import com.school_management_system.entity.Role;


public record UserUpdateRequest(
        String firstName,
        String lastName,
        String email,
        Role role
) {} 
