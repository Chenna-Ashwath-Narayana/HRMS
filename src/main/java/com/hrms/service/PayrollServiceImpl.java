package com.hrms.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.exception.ResourceNotFoundException;  // Importing your custom exception
import com.hrms.model.Employee;
import com.hrms.model.Payroll;
import com.hrms.repo.EmployeeRepo;
import com.hrms.repo.PayrollRepository;

@Service
public class PayrollServiceImpl implements PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepo employeeRepository;

    @Override
    public Payroll createPayroll(Long employeeId, String month, int year) {
        // Ensure that employee exists in the database before proceeding
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        Payroll payroll = new Payroll();
        payroll.setEmployeeId(employee.getEmployeeId());
        payroll.setSalaryPaid(employee.getSalary());
        payroll.setMonth(month);
        payroll.setYear(year);
        payroll.setPaymentDate(LocalDate.now());

        return payrollRepository.save(payroll);
    }

    @Override
    public List<Payroll> getPayrollByEmployeeId(Long employeeId) {
        // Ensure employee exists before fetching payroll
        if (!employeeRepository.existsByEmployeeId(employeeId)) {
            throw new ResourceNotFoundException("Employee not found with ID: " + employeeId);
        }
        return payrollRepository.findByEmployeeId(employeeId);
    }
}
