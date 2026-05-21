package com.school_management_system.security;

import com.fasterxml.jackson.databind.JsonNode;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class RbacIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void studentShouldAccessStudentEndpoint()
            throws Exception {

        String token = registerAndLogin(
                "student1@test.com",
                Role.STUDENT
        );

        mockMvc.perform(get("/api/users/student")
                        .header(
                                "Authorization",
                                "Bearer " + token
                        ))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        "Student access granted"
                ));
    }

    @Test
    void studentShouldNotAccessAdminEndpoint()
            throws Exception {

        String token = registerAndLogin(
                "student2@test.com",
                Role.STUDENT
        );

        mockMvc.perform(get("/api/users/admin")
                        .header(
                                "Authorization",
                                "Bearer " + token
                        ))
                .andExpect(status().isForbidden());
    }

    @Test
    void adminShouldAccessAdminEndpoint()
            throws Exception {

        String token = registerAndLogin(
                "admin@test.com",
                Role.ADMIN
        );

        mockMvc.perform(get("/api/users/admin")
                        .header(
                                "Authorization",
                                "Bearer " + token
                        ))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        "Admin access granted"
                ));
    }

    @Test
    void teacherShouldAccessTeacherEndpoint()
            throws Exception {

        String token = registerAndLogin(
                "teacher@test.com",
                Role.TEACHER
        );

        mockMvc.perform(get("/api/users/teacher")
                        .header(
                                "Authorization",
                                "Bearer " + token
                        ))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        "Teacher access granted"
                ));
    }

    private String registerAndLogin(
            String email,
            Role role
    ) throws Exception {

        UserRequest registerRequest =
                new UserRequest();

        registerRequest.name = "Test User";
        registerRequest.email = email;
        registerRequest.password = "1234";
        registerRequest.role = role;

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        objectMapper.writeValueAsString(
                                registerRequest
                        )
                ));

        LoginRequest loginRequest =
                new LoginRequest();

        loginRequest.email = email;
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
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode jsonNode =
                objectMapper.readTree(response);

        return jsonNode.get("token").asText();
    }
}