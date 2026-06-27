package com.school_management_system.dto.user;

import com.school_management_system.entity.Role;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RegistrationResponse {
    public Long id;
    public String firstName;
    public String lastName;
    public String email;
    public String token;
    public Role role;
}