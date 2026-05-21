package com.school_management_system.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school_management_system.auth.dto.LoginRequest;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.entity.Role;

import lombok.AllArgsConstructor;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    
    @Autowired
    private  MockMvc mockMvc;
    @Autowired
    private  ObjectMapper objectMapper;

    @Test
    void shouldReturnUnauthorizedWithoutToken() throws Exception {

        mockMvc.perform(get("/api/users/profile"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldReturnUnauthorizedWithInvalidToken() throws Exception {

        mockMvc.perform(get("/api/users/profile")
                        .header(
                                "Authorization",
                                "Bearer invalid-token"
                        ))
                .andExpect(status().isUnauthorized());
    }
 
    @Test
    @SuppressWarnings("null")
    void shouldAccessProtectedEndpointWithValidToken()
            throws Exception {

        UserRequest registerRequest = new UserRequest();
        registerRequest.name = "John Doe";
        registerRequest.email = "secure@test.com";
        registerRequest.password = "1234";
        registerRequest.role = Role.STUDENT;

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        objectMapper.writeValueAsString(
                                registerRequest
                        )
                ));

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.email = "secure@test.com";
        loginRequest.password = "1234";

        String response = mockMvc.perform(
                        post("/api/auth/login")
                                .contentType(
                                        MediaType.APPLICATION_JSON
                                )
                                .content(
                                        objectMapper.writeValueAsString(
                                                loginRequest
                                        )
                                )
                )
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String token = objectMapper
                .readTree(response)
                .get("token")
                .asText();

        mockMvc.perform(get("/api/users/profile")
                        .header(
                                "Authorization",
                                "Bearer " + token
                        ))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        "Protected profile endpoint"
                ));
    }
}
