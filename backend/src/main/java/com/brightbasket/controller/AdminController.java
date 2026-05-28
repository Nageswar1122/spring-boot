package com.brightbasket.controller;

import org.springframework.web.bind.annotation.*;

import com.brightbasket.model.Admin;
import com.brightbasket.service.AdminService;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /* ✅ ADD ADMIN EMAIL (POSTMAN) */
    @PostMapping
    public Admin createAdmin(@RequestParam String email) {
        return adminService.createAdmin(email);
    }

    /* ✅ ADMIN LOGIN (EMAIL ONLY) */
    @PostMapping("/login")
    public Admin login(@RequestParam String email) {
        return adminService.loginByEmail(email);
    }
}
