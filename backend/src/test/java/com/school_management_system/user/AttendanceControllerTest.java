package com.school_management_system.user;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.school_management_system.auth.service.JwtService;
import com.school_management_system.controller.AttendanceController;
import com.school_management_system.attendance.AttendanceStatus;
import com.school_management_system.auth.security.CustomUserDetails;
import com.school_management_system.auth.service.CustomUserDetailsService;
import com.school_management_system.dto.AttendanceRequest;
import com.school_management_system.dto.AttendanceResponse;
import com.school_management_system.entity.User;
import com.school_management_system.service.AttendanceService;
import com.school_management_system.entity.Role;                

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user; // CRITICAL STATIC IMPORT
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AttendanceController.class)
class AttendanceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AttendanceService attendanceService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private CustomUserDetailsService userDetailsService;

    private AttendanceRequest validRequest;
    private AttendanceResponse mockResponse;
    private CustomUserDetails mockTeacherPrincipal;
    private CustomUserDetails mockStudentPrincipal;
    private CustomUserDetails mockAdminPrincipal;

    @BeforeEach
    void setUp() {
        // 1. Build Payload Schemas
        validRequest = new AttendanceRequest();
        validRequest.studentId = 101L;
        validRequest.attendanceDate = LocalDate.now();
        validRequest.status = AttendanceStatus.PRESENT;
        validRequest.remarks = "On time";

        mockResponse = new AttendanceResponse();
        mockResponse.id = 1L;
        mockResponse.studentId = 101L;
        mockResponse.studentName = "John Doe";
        mockResponse.status = AttendanceStatus.PRESENT;

        // 2. Setup Real Security Entities for Authentication Contexts
        User teacherEntity = new User();
        teacherEntity.setId(5L);
        teacherEntity.setName("Professor Smith");
        teacherEntity.setRole(Role.TEACHER);
        mockTeacherPrincipal = new CustomUserDetails(teacherEntity);

        User studentEntity = new User();
        studentEntity.setId(101L);
        studentEntity.setRole(Role.STUDENT);
        mockStudentPrincipal = new CustomUserDetails(studentEntity);

        User adminEntity = new User();
        adminEntity.setId(99L);
        adminEntity.setRole(Role.ADMIN);
        mockAdminPrincipal = new CustomUserDetails(adminEntity);
    }

    // --- POST Endpoint Tests ---

    @Test
    void markAttendance_ShouldReturnOk_WhenTeacherSubmitsValidData() throws Exception {
        when(attendanceService.markAttendance(any(AttendanceRequest.class), any()))
                .thenReturn(mockResponse);

        mockMvc.perform(post("/api/attendance")
                        .with(user(mockTeacherPrincipal)) // Injecting custom user entity object wrapper
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void markAttendance_ShouldReturnForbidden_WhenUserIsStudent() throws Exception {
        mockMvc.perform(post("/api/attendance")
                        .with(user(mockStudentPrincipal)) // Students are rejected by @PreAuthorize rules
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isForbidden());
    }

    // --- GET Endpoint Tests ---

    @Test
    void getStudentAttendance_ShouldReturnList_WhenUserIsTeacher() throws Exception {
        when(attendanceService.getStudentAttendance(101L))
                .thenReturn(List.of(mockResponse));

        mockMvc.perform(get("/api/attendance/student/101")
                        .with(user(mockTeacherPrincipal))) // Teachers can view
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].studentId").value(101));
    }

    @Test
    void getStudentAttendance_ShouldReturnList_WhenUserIsAdmin() throws Exception {
        when(attendanceService.getStudentAttendance(101L))
                .thenReturn(List.of(mockResponse));

        mockMvc.perform(get("/api/attendance/student/101")
                        .with(user(mockAdminPrincipal))) // Admins can view
                .andExpect(status().isOk());
    }

    @Test
    void getStudentAttendance_ShouldReturnForbidden_WhenUserIsStudent() throws Exception {
        mockMvc.perform(get("/api/attendance/student/101")
                        .with(user(mockStudentPrincipal))) // Students are blocked
                .andExpect(status().isForbidden());
    }
}
