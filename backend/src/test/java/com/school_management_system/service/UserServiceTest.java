package com.school_management_system.service;


import com.school_management_system.common.exception.EmailAlreadyExistsException;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.dto.UserResponse;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private UserRequest userRequest;

    @BeforeEach
    void setUp() {

        userRequest = new UserRequest();
        userRequest.name = "John Doe";
        userRequest.email = "john@test.com";
        userRequest.password = "1234";
        userRequest.role = Role.STUDENT;
    }

    @Test
    @SuppressWarnings("null")
    void shouldCreateUserSuccessfully() {

        when(userRepository.findByEmail(userRequest.email))
                .thenReturn(Optional.empty());

        when(passwordEncoder.encode(userRequest.password))
                .thenReturn("encodedPassword");

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setName(userRequest.name);
        savedUser.setEmail(userRequest.email);
        savedUser.setPassword("encodedPassword");
        savedUser.setRole(userRequest.role);

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        UserResponse response =
                userService.createUser(userRequest);

        assertNotNull(response);
        assertEquals(1L, response.id);
        assertEquals("John Doe", response.name);
        assertEquals("john@test.com", response.email);
        assertEquals(Role.STUDENT, response.role);

        verify(userRepository, times(1))
                .save(any(User.class));
    }

    @Test
    @SuppressWarnings("null")
    void shouldThrowExceptionWhenEmailAlreadyExists() {

        when(userRepository.findByEmail(userRequest.email))
                .thenReturn(Optional.of(new User()));

        assertThrows(
                EmailAlreadyExistsException.class,
                () -> userService.createUser(userRequest)
        );

        verify(userRepository, never())
                .save(any(User.class));
    }
}
