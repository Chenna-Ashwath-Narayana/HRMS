package com.hrms.service;

import java.util.List;

import com.hrms.model.Payroll;

public interface PayrollService {

	public Payroll createPayroll(Long employeeId, String month , int year);
	public List<Payroll> getPayrollByEmployeeId(Long employeeId);
}
