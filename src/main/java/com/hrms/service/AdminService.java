package com.hrms.service;

import java.util.Optional;

import com.hrms.model.Admin;

public interface AdminService {

	public Admin addAdmin(Admin admin);
	public Optional<Admin> findByAdminIdAndPassword(Long adminId , String password);
	
	public Optional<Admin> getAdminId(Long adminId);
}
