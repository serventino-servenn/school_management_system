package com.school_management_system.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    long countByRole(Role role);
    long countByRoleAndCreatedAtAfter(Role role,LocalDate dateTime);
}
