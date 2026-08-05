package com.school_management_system.service;

import java.time.LocalDate;
import org.springframework.stereotype.Service;


import com.school_management_system.dto.DashboardStats;
import com.school_management_system.dto.DashboardStats.StatMetric;
import com.school_management_system.entity.Role;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor // Lombok automatically creates the constructor for dependency injection
public class DashboardService {

    // These final fields will be automatically injected by Spring via Lombok's constructor
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
   
    public DashboardStats getDashboardStats() {
        log.info("Fetching dashboard metrics data");

        // 1. Keep these as LocalDateTime for User and Course entities
        LocalDate oneWeekAgo = LocalDate.now().minusDays(7);
        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1);

        // Fetch Student Metrics
        long students = userRepository.countByRole(Role.STUDENT);
        long newStudents = userRepository.countByRoleAndCreatedAtAfter(Role.STUDENT, oneWeekAgo);
        StatMetric studentsDetail = new StatMetric(students, "+" + newStudents + " this week");

        // Fetch Teacher Metrics
        long teachers = userRepository.countByRole(Role.TEACHER);
        long newTeachers = userRepository.countByRoleAndCreatedAtAfter(Role.TEACHER, oneMonthAgo);
        StatMetric teachersDetail = new StatMetric(teachers, "+" + newTeachers + " this month");

        // Fetch Course Metrics
        long courses = courseRepository.count();
        long newCourses = courseRepository.countByCreatedAtAfter(oneMonthAgo); 
        StatMetric coursesDetail = new StatMetric(courses, "+" + newCourses + " new courses");

        // 2. Extract just the LocalDate portion specifically for the Enrollment entity 👇
        // java.time.LocalDate enrollmentDateThreshold = oneMonthAgo;

        // Fetch Enrollment Metrics using the correct LocalDate parameter
        long enrollments = enrollmentRepository.count();
        long newEnrollments = enrollmentRepository.countByCreatedAtAfter(oneMonthAgo); 
        // StatMetric enrollmentsDetail = new StatMetric(enrollments, "+" + newEnrollments + " this month");

        // return new DashboardStats(studentsDetail, teachersDetail, coursesDetail, enrollmentsDetail);

        return new DashboardStats(
                new DashboardStats.StatMetric(students, null),
                new DashboardStats.StatMetric(teachers, null),
                new DashboardStats.StatMetric(courses, null),
                new DashboardStats.StatMetric(enrollments, null)
        );
    }

    // public AiInsightReport generateRealAiInsights() {
    //     log.info("Aggregating system data for live AI model analysis");

    //     // 2. Gather actual live raw stats from your database
    //     long students = userRepository.countByRole(Role.STUDENT);
    //     long teachers = userRepository.countByRole(Role.TEACHER);
    //     long courses = courseRepository.count();
    //     long enrollments = enrollmentRepository.count();

    //     // 3. Set up a Structured Output Converter for your exact DTO class
    //     var outputConverter = new StructuredOutputConverter<>(AiInsightReport.class);
    //     String jsonFormatInstructions = outputConverter.getPlugins();

    //     // 4. Create an advanced system prompt passing raw data to the AI
    //     String rawPrompt = """
    //         You are the core AI Analytics engine for a SaaS School Management System.
    //         Analyze the following live platform database metrics:
    //         - Total Registered Students: {students}
    //         - Total Active Instructors: {teachers}
    //         - Total Course Catalog Items: {courses}
    //         - Total Seat Enrollments: {enrollments}
            
    //         Based on these metrics, generate an Executive Summary and exactly 2 platform alerts.
    //         If the student-to-teacher ratio is high, flag it. Otherwise, simulate realistic variations 
    //         of attendance anomalies or grading performance drop risks relevant to this school scale.
            
    //         {format_instructions}
    //         """;

    //     // 5. Inject the live metrics into the prompt template
    //     PromptTemplate template = new PromptTemplate(rawPrompt);
    //     Prompt prompt = template.create(Map.of(
    //         "students", students,
    //         "teachers", teachers,
    //         "courses", courses,
    //         "enrollments", enrollments,
    //         "format_instructions", jsonFormatInstructions
    //     ));

    //     log.info("Dispatching context-rich prompt matrix to the LLM cloud endpoint");
        
    //     // 6. Call the LLM, capture the raw response string, and cast it directly into your Java object
    //     String aiRawResponse = chatModel.call(prompt).getResult().getOutput().getContent();
        
    //     return outputConverter.convert(aiRawResponse);
    // }

    

}

