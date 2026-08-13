package com.school_management_system.dto;

import com.school_management_system.entity.Role;

public record UserDistributionResponse(
    Role role,
    Long count
) {
}
