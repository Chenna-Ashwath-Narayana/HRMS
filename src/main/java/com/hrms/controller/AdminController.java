package com.hrms.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.Admin;
import com.hrms.service.AdminServiceImplementation;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

	@Autowired private AdminServiceImplementation adminServiceImplementation;
	@Autowired private PasswordEncoder passwordEncoder;
	
	@GetMapping("/test")
	public String testPage() {
		return "Welcome to the Test Page";
	}
	
	@PostMapping("/saveadmin")
	public Admin saveAdmin(@RequestBody Admin admin) {
		Admin saveAdmin = adminServiceImplementation.addAdmin(admin);
		return saveAdmin;
	}
	
	@GetMapping("/getadmin/{adminId}")
	public Optional<?> getAdmin(@PathVariable Long adminId) {
		Optional<?> getAdmin = adminServiceImplementation.getAdminId(adminId);
		return getAdmin;
	}
	
	@PostMapping("/getadmin/{adminId}/{password}")
	public ResponseEntity<?> getAdminByPassword(@PathVariable Long adminId, @PathVariable String password) {
	    Optional<?> getByAdminIdAndPassword = adminServiceImplementation.findByAdminIdAndPassword(adminId, password);

	    // Check if the Optional contains a value
	    if (getByAdminIdAndPassword.isPresent()) {
	        // Return the admin details if found
	        return ResponseEntity.ok(getByAdminIdAndPassword.get());
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found or incorrect password.");
	    }
	}

	@PutMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, Object> requestBody) {
        Long adminId = Long.valueOf(requestBody.get("adminId").toString());
        String newPassword = requestBody.get("newPassword").toString();

        boolean isUpdated = adminServiceImplementation.updatePassword(adminId, newPassword);

        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Admin not found or invalid request");
        }
    }

	
	
	
}
