package com.school_management_system.service;


import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.school_management_system.auth.service.JwtService;
import com.school_management_system.common.exception.EmailAlreadyExistsException;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.dto.UserResponse;
import com.school_management_system.dto.RegistrationResponse;
import com.school_management_system.entity.User;
import com.school_management_system.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtProvider; 

    @Transactional 
    public RegistrationResponse createUser(UserRequest request) {
        if (userRepository.findByEmail(request.email).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user = new User();
        user.setFirstName(request.firstName);
        user.setLastName(request.lastName);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setRole(request.role);

        User saved = userRepository.save(user);
        
        String token = jwtProvider.generateToken(saved.getEmail());
        
        return mapToRegistrationResponse(saved, token);
    }

    //get all users
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserResponse)
                .toList();
    }

    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getRole()
        );
    }

   
    private RegistrationResponse mapToRegistrationResponse(User user, String token) {
        return new RegistrationResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            token,
            user.getRole()
        );
    }
}
