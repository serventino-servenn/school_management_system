package com.school_management_system.attendance;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.dto.AttendanceRequest;
import com.school_management_system.dto.AttendanceResponse;
import com.school_management_system.entity.Attendance;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.AttendanceRepository;
import com.school_management_system.repository.UserRepository;
import com.school_management_system.service.AttendanceService;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceTest {

    @Mock
    private AttendanceRepository attendanceRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AttendanceService attendanceService;

    @Test
    void markAttendance_success() {

        User teacher = new User();
        teacher.setId(1L);
        teacher.setRole(Role.TEACHER);

        User student = new User();
        student.setId(2L);
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setRole(Role.STUDENT);

        AttendanceRequest request = new AttendanceRequest();
        request.studentId = 2L;
        request.attendanceDate = LocalDate.now();
        request.status = AttendanceStatus.PRESENT;
        request.remarks = "Good";

        Attendance saved = Attendance.builder()
                .id(10L)
                .student(student)
                .teacher(teacher)
                .attendanceDate(request.attendanceDate)
                .status(request.status)
                .remarks(request.remarks)
                .build();

        when(userRepository.findById(2L))
                .thenReturn(Optional.of(student));

        when(attendanceRepository.save(any(Attendance.class)))
                .thenReturn(saved);

        AttendanceResponse response =
                attendanceService.markAttendance(request, teacher);

        assertEquals(10L, response.id);
        assertEquals("John", response.studentName);
        assertEquals(AttendanceStatus.PRESENT, response.status);
    }

    @Test
    void markAttendance_studentNotFound() {

        User teacher = new User();
        teacher.setRole(Role.TEACHER);

        AttendanceRequest request = new AttendanceRequest();
        request.studentId = 99L;

        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () ->
                attendanceService.markAttendance(request, teacher)
        );
    }
}
