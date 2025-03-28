package com.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.Payroll;
import com.hrms.service.PayrollService;
import com.hrms.service.PayrollServiceImpl;

@RestController
@RequestMapping("/payroll")
@CrossOrigin(origins = "*")
public class PayrollController {

	@Autowired
    private PayrollServiceImpl payrollService;

	@PostMapping("/create")
	public ResponseEntity<?> createPayroll(@RequestParam Long employeeId, @RequestParam String month, @RequestParam int year) {
	    if (employeeId == null || month == null || year <= 0) {
	        return ResponseEntity.badRequest().body("Invalid input parameters.");
	    }
	    Payroll payroll = payrollService.createPayroll(employeeId, month, year);
	    return ResponseEntity.ok(payroll);
	}



    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayrollByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollByEmployeeId(employeeId));
    }
    
    @GetMapping("/history/{employeeId}")
    public ResponseEntity<List<Payroll>> getPaymentHistory(@PathVariable Long employeeId) {
        List<Payroll> paymentHistory = payrollService.getPayrollByEmployeeId(employeeId);
        return ResponseEntity.ok(paymentHistory);
    }

}
