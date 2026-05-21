package com.school_management_system.auth.dto;

public class AuthResponse {

    public String token;

    public AuthResponse(String token) {
        this.token = token;
    }
}