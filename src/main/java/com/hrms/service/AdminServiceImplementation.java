package com.hrms.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.model.Admin;
import com.hrms.repo.AdminRepository;

@Service
public class AdminServiceImplementation implements AdminService {

	@Autowired private AdminRepository adminRepository;
	
	@Override
	public Admin addAdmin(Admin admin) {
		Admin saveAdmin = adminRepository.save(admin);
		return saveAdmin;
	}

	@Override
	public Optional<Admin> findByAdminIdAndPassword(Long adminId, String password) {
		return adminRepository.findByAdminIdAndPassword(adminId, password);
	}

	@Override
	public Optional<Admin> getAdminId(Long adminId) {
		Optional<Admin> getAdmin = adminRepository.findById(adminId);
		return getAdmin;
	}
	

	

}
