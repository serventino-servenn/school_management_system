package com.school_management_system.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.school_management_system.dto.DashboardInsightsResponse;
import com.school_management_system.dto.InsightAlertResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiInsightsService {
    public DashboardInsightsResponse getInsights() {

        List<InsightAlertResponse> alerts = new ArrayList<>();

        alerts.add(
            new InsightAlertResponse(
                1L,
                "warning",
                "2 courses do not have an assigned instructor."
            )
        );

        alerts.add(
            new InsightAlertResponse(
                2L,
                "danger",
                "8 students are not enrolled in any course."
            )
        );

        return new DashboardInsightsResponse(
            "System operating normally. Enrollment activity increased this month and attendance remains stable.",
            alerts
        );
    }
}