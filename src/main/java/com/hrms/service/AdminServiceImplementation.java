package com.hrms.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hrms.model.Admin;
import com.hrms.repo.AdminRepository;

@Service
public class AdminServiceImplementation implements AdminService {

    @Autowired 
    private AdminRepository adminRepository;
    
    @Autowired 
    private PasswordEncoder passwordEncoder; // ✅ Inject PasswordEncoder

    @Override
    public Admin addAdmin(Admin admin) {
        // Encrypt password before saving
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> findByAdminIdAndPassword(Long adminId, String password) {
        return adminRepository.findByAdminIdAndPassword(adminId, password);
    }

    @Override
    public Optional<Admin> getAdminId(Long adminId) {
        return adminRepository.findById(adminId);
    }

    @Override
    public boolean updatePassword(Long adminId, String newPassword) {
        Optional<Admin> optionalAdmin = adminRepository.findById(adminId);

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            admin.setPassword((newPassword)); // Hash new password
            adminRepository.save(admin);
            return true;
        }
        return false;
    }

    
}
