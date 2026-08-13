package com.school_management_system.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.school_management_system.dto.UserDistributionResponse;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    long countByRole(Role role);
    long countByRoleAndCreatedAtAfter(Role role,LocalDate dateTime);
    Page<User> findByRole(Role role, Pageable pageable);

    @Query("""
        SELECT new com.school_management_system.dto.UserDistributionResponse(
            u.role,
            COUNT(u.id)
        )
        FROM User u
        GROUP BY u.role
        ORDER BY COUNT(u.id) DESC
    """)
    List<UserDistributionResponse> getUserDistribution();

    @Query("""
        SELECT COUNT(u)
        FROM User u
        WHERE u.role = :role
        AND u.createdAt >= :startDate
        AND u.createdAt < :endDate
    """)
    long countUsersByRoleAndDateRange(
            @Param("role") Role role,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
