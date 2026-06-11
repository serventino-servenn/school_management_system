package com.school_management_system.dto;

  public record InsightAlertResponse(
        Long id,
        String type,
        String message
    ) {
    }
