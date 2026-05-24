package com.school_management_system.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school_management_system.auth.dto.LoginRequest;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.entity.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @SuppressWarnings("null")
    void shouldRegisterUserSuccessfully() throws Exception {

        UserRequest request = new UserRequest();
        request.firstName = "John";
        request.lastName = "Doe";
        request.email = "john@test.com";
        request.password = "1234";
        request.role = Role.STUDENT;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(request)
                        ))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email")
                        .value("john@test.com"));
    }

    @Test
    @SuppressWarnings("null")
    void shouldFailValidationWhenRegisteringUser() throws Exception {

        UserRequest request = new UserRequest();
        request.firstName = "John";
        request.lastName = "Doe";
        request.email = "invalid-email";
        request.password = "1";

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(request)
                        ))
                .andExpect(status().isBadRequest());
    }

    @Test
    @SuppressWarnings("null")
    void shouldLoginSuccessfully() throws Exception {

        UserRequest registerRequest = new UserRequest();
        registerRequest.firstName = "John";
        registerRequest.lastName = "Doe";
        registerRequest.email = "login@test.com";
        registerRequest.password = "1234";
        registerRequest.role = Role.STUDENT;

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        objectMapper.writeValueAsString(registerRequest)
                ));

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.email = "login@test.com";
        loginRequest.password = "1234";

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                objectMapper.writeValueAsString(loginRequest)
                        ))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token")
                        .exists());
    }
}