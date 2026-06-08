package com.school_management_system.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school_management_system.dto.DashboardStats;
import com.school_management_system.service.DashboardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor // Automatically injects DashboardService via constructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')") // Secures the endpoint using Role-Based Access Control (RBAC)
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        log.info("REST request to fetch global admin dashboard metrics");
        
        DashboardStats stats = dashboardService.getDashboardStats();
        
        return ResponseEntity.ok(stats);
    }
}

