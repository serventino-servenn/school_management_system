package com.school_management_system.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.school_management_system.auth.service.JwtService;
import com.school_management_system.common.exception.EmailAlreadyExistsException;
import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.common.exception.UserDeletionNotAllowedException;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.dto.UserResponse;
import com.school_management_system.dto.UserUpdateRequest;
import com.school_management_system.dto.RegistrationResponse;
import com.school_management_system.entity.Role;
import com.school_management_system.entity.User;
import com.school_management_system.repository.AttendanceRepository;
import com.school_management_system.repository.CourseRepository;
import com.school_management_system.repository.EnrollmentRepository;
import com.school_management_system.repository.GradeRepository;
import com.school_management_system.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtProvider; 

    private final AttendanceRepository attendanceRepository;
    private final GradeRepository gradeRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public RegistrationResponse createUser(UserRequest request) {

        validateEmail(request.email, null);

        User user = new User();
        user.setFirstName(request.firstName);
        user.setLastName(request.lastName);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setRole(request.role);

        User saved = userRepository.save(user);

        String token = jwtProvider.generateToken(saved.getEmail());

        return mapToRegistrationResponse(saved, token);
    }

    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {

        User user = findUserById(id);

        validateEmail(request.email(), id);

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setRole(request.role());

        User updatedUser = userRepository.save(user);

        return mapToUserResponse(updatedUser);
    }

    @Transactional
    public UserResponse toggleUserStatus(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setActive(!user.isActive());

        return mapToUserResponse(userRepository.save(user));
    }

    //get all users
    public Page<UserResponse> getAllUsers(int page, int size) {

            Pageable pageable = PageRequest.of(page, size);

            return userRepository.findAll(pageable)
                    .map(this::mapToUserResponse);
    }

    //get user by id
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToUserResponse(user);
    }

    @Transactional
    public void deleteUser(Long id) {

        User user = findUserById(id);

        switch (user.getRole()) {

            case STUDENT -> validateStudentDeletion(user);

            case TEACHER -> validateTeacherDeletion(user);

            case ADMIN -> validateAdminDeletion(user);
        }

        userRepository.delete(user);
    }

    private User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
   }

   private void validateStudentDeletion(User student) {

        if (attendanceRepository.existsByStudent(student)) {
            throw new UserDeletionNotAllowedException(
                    "Cannot delete student because attendance records exist."
            );
        }

        if (gradeRepository.existsByStudent(student)) {
            throw new UserDeletionNotAllowedException(
                    "Cannot delete student because grades exist."
            );
        }

        if (enrollmentRepository.existsByStudent(student)) {
            throw new UserDeletionNotAllowedException(
                    "Cannot delete student because enrollment records exist."
            );
        }
   }

   private void validateTeacherDeletion(User teacher) {

        if (attendanceRepository.existsByTeacher(teacher)) {
            throw new UserDeletionNotAllowedException(
                    "Cannot delete teacher because attendance records exist."
            );
        }

        if (gradeRepository.existsByCourseTeacher(teacher)) {
            throw new UserDeletionNotAllowedException(
                    "Cannot delete teacher because grade records exist."
            );
        }

        if (courseRepository.existsByTeacher(teacher)) {
            throw new UserDeletionNotAllowedException(
                    "Cannot delete teacher because assigned courses exist."
            );
        }
    }

    private void validateAdminDeletion(User admin) {

        long adminCount = userRepository.countByRole(Role.ADMIN);

        if (adminCount <= 1) {
            throw new IllegalStateException(
                    "The last administrator cannot be deleted."
            );
        }
    }

   private void validateEmail(String email, Long currentUserId) {

        userRepository.findByEmail(email)
                .ifPresent(existingUser -> {

                    if (currentUserId == null ||
                            !existingUser.getId().equals(currentUserId)) {

                        throw new EmailAlreadyExistsException("Email already exists");
                    }

                });
   }

    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getRole(),
            user.isActive()
        );
    }

   
    private RegistrationResponse mapToRegistrationResponse(User user, String token) {
        return new RegistrationResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            token,
            user.getRole()
        );
    }
}
