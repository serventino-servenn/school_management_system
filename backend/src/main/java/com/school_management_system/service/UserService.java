package com.school_management_system.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.school_management_system.common.exception.EmailAlreadyExistsException;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.dto.UserResponse;
import com.school_management_system.entity.User;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
  
    public UserResponse createUser(UserRequest request) {

        if (userRepository.findByEmail(request.email).isPresent()) {
            throw new EmailAlreadyExistsException(
                    "Email already exists"
            );
        }

        final User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setRole(request.role);

        User saved = userRepository.save(user);

        UserResponse response = new UserResponse();
        response.id = saved.getId();
        response.name = saved.getName();
        response.email = saved.getEmail();
        response.role = saved.getRole();

        return response;
    }
}