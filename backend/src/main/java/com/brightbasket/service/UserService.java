package com.brightbasket.service;

import com.brightbasket.dto.UpdateProfileRequestDTO;
import com.brightbasket.exception.ResourceNotFoundException;
import com.brightbasket.model.User;
import com.brightbasket.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Get User by ID (for controller getProfile)
    public User getProfile(Long userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    // Update User profile
    public User updateProfile(Long userId, UpdateProfileRequestDTO dto) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        if (dto.getName() != null)
            user.setName(dto.getName());
        if (dto.getPhone() != null)
            user.setPhone(dto.getPhone());
        if (dto.getStreet() != null)
            user.getAddress().setStreet(dto.getStreet());
        if (dto.getCity() != null)
            user.getAddress().setCity(dto.getCity());
        if (dto.getState() != null)
            user.getAddress().setState(dto.getState());
        if (dto.getZipCode() != null)
            user.getAddress().setZipCode(dto.getZipCode());
        if (dto.getCountry() != null)
            user.getAddress().setCountry(dto.getCountry());

        return userRepo.save(user);
    }
}
