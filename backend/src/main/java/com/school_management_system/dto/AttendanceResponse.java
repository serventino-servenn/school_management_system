package com.school_management_system.dto;



import java.time.LocalDate;

import com.school_management_system.attendance.AttendanceStatus;

public class AttendanceResponse {

    public Long id;

    public Long studentId;

    public String studentName;

    public Long teacherId;

    public String teacherName;

    public Long courseId;
   
    public String courseTitle; 

    public LocalDate attendanceDate;

    public AttendanceStatus status;

    public String remarks;
} 
