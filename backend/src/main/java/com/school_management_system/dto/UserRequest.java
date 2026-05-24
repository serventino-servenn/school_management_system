package com.school_management_system.dto;

import com.school_management_system.entity.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserRequest {

    @NotBlank(message = "First name is required")
    public String firstName;

    @NotBlank(message = "Last name is required")
    public String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    public String email;

    @Size(min = 4, message = "Password must be at least 4 characters")
    public String password;

    @NotNull(message = "Role is required")
    public Role role;
}
