package com.school_management_system.auth.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthResponse {

    private String token;  
    private String role;
}