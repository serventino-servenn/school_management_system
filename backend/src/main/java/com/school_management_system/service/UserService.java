package com.school_management_system.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.school_management_system.auth.service.JwtService;
import com.school_management_system.common.exception.EmailAlreadyExistsException;
import com.school_management_system.common.exception.ResourceNotFoundException;
import com.school_management_system.dto.UserRequest;
import com.school_management_system.dto.UserResponse;
import com.school_management_system.dto.UserUpdateRequest;
import com.school_management_system.dto.RegistrationResponse;
import com.school_management_system.entity.User;
import com.school_management_system.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtProvider; 

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

    private User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
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
