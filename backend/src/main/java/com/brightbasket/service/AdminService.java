package com.brightbasket.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brightbasket.exception.BadRequestException;
import com.brightbasket.exception.ResourceNotFoundException;
import com.brightbasket.model.Admin;
import com.brightbasket.repository.AdminRepository;

@Service
@Transactional
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    /* ✅ CREATE ADMIN (EMAIL ONLY) */
    public Admin createAdmin(String email) {

        if (adminRepository.existsByEmail(email)) {
            throw new BadRequestException("Admin already exists with email: " + email);
        }

        Admin admin = new Admin();
        admin.setEmail(email);

        return adminRepository.save(admin);
    }

    /* ✅ LOGIN ADMIN (EMAIL CHECK) */
    public Admin loginByEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Admin not allowed with email: " + email));
    }
}
