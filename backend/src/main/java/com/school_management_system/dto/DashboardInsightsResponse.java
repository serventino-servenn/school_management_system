package com.school_management_system.dto;

import java.util.List;

public record DashboardInsightsResponse(
        String summary,
        List<InsightAlertResponse> alerts
) {
}
