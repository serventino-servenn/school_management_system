package com.school_management_system.dto;

import com.school_management_system.attendance.AttendanceStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class AttendanceRequest {

    @NotNull
    public Long studentId;

    @NotNull
    public LocalDate attendanceDate;

    @NotNull
    public AttendanceStatus status;

    @NotNull
    public Long courseId;

    public String remarks;
}
