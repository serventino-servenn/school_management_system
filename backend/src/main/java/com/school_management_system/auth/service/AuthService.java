package com.school_management_system.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.school_management_system.auth.dto.AuthResponse;
import com.school_management_system.auth.dto.LoginRequest;
import com.school_management_system.common.exception.AccountDisabledException;
import com.school_management_system.common.exception.InvalidCredentialsException;
import com.school_management_system.entity.User;
import com.school_management_system.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email)
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password")
                );

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.password,
                        user.getPassword()
                );

        if (!passwordMatches) {
                throw new InvalidCredentialsException("Invalid email or password");
        }

        if (!user.isActive()) {
                throw new AccountDisabledException(
                        "Your account has been deactivated. Please contact an administrator."
                );
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                user.getRole().name()
        );
    }
}
