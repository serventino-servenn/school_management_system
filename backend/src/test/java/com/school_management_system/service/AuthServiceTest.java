package com.school_management_system.service;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.school_management_system.auth.dto.AuthResponse;
import com.school_management_system.auth.dto.LoginRequest;
import com.school_management_system.auth.service.AuthService;
import com.school_management_system.auth.service.JwtService;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private LoginRequest loginRequest;
    private User user;

    @BeforeEach
    void setUp() {

        loginRequest = new LoginRequest();
        loginRequest.email = "john@test.com";
        loginRequest.password = "1234";

        user = new User();
        user.setId(1L);
        user.setName("John Doe");
        user.setEmail("john@test.com");
        user.setPassword("encodedPassword");
        user.setRole(Role.STUDENT);
    }

    @Test
    void shouldLoginSuccessfully() {

        when(userRepository.findByEmail(loginRequest.email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(
                loginRequest.password,
                user.getPassword()
        )).thenReturn(true);

        when(jwtService.generateToken(user.getEmail()))
                .thenReturn("mocked-jwt-token");

        AuthResponse response =
                authService.login(loginRequest);

        assertNotNull(response);
        assertEquals(
                "mocked-jwt-token",
                response.token
        );

        verify(jwtService, times(1))
                .generateToken(user.getEmail());
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {

        when(userRepository.findByEmail(loginRequest.email))
                .thenReturn(Optional.empty());

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> authService.login(loginRequest)
                );

        assertEquals(
                "Invalid credentials",
                exception.getMessage()
        );

        verify(jwtService, never())
                .generateToken(anyString());
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsInvalid() {

        when(userRepository.findByEmail(loginRequest.email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(
                loginRequest.password,
                user.getPassword()
        )).thenReturn(false);

        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> authService.login(loginRequest)
                );

        assertEquals(
                "Invalid credentials",
                exception.getMessage()
        );

        verify(jwtService, never())
                .generateToken(anyString());
    }
}
