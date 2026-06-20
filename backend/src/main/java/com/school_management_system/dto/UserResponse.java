package com.school_management_system.dto;

import com.school_management_system.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UserResponse {

    public Long id;

    public String firstName;

    public String lastName;

    public String email;

    public Role role;

}
