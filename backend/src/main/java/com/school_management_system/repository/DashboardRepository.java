package com.school_management_system.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.school_management_system.entity.User;

import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<User, Long> {

    // Fetches all counts simultaneously into an Object array
    @Query("""
        SELECT 
            (SELECT COUNT(u) FROM User u WHERE u.role.name = 'STUDENT'),
            (SELECT COUNT(u) FROM User u WHERE u.role.name = 'TEACHER'),
            (SELECT COUNT(c) FROM Course c),
            (SELECT COUNT(e) FROM Enrollment e)
    """)
    List<Object[]> fetchGlobalCounts();
}



