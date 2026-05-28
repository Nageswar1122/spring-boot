package com.brightbasket.controller;

import com.brightbasket.dto.UpdateProfileRequestDTO;
import com.brightbasket.model.User;
import com.brightbasket.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
public class UserProfileController {

    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    // ✅ GET PROFILE
    @GetMapping
    public ResponseEntity<User> getProfile(@RequestParam Long userId) {
        return ResponseEntity.ok(userService.getProfile(userId));
    }

    // ✅ UPDATE PROFILE
    @PutMapping
    public ResponseEntity<User> updateProfile(
            @RequestParam Long userId,
            @Valid @RequestBody UpdateProfileRequestDTO dto) {

        return ResponseEntity.ok(userService.updateProfile(userId, dto));
    }
}
