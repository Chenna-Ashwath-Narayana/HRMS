package com.hrms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hrms.model.Employee;
import com.hrms.repo.EmployeeRepo;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo repo;

    @Override
    public ResponseEntity<Employee> addEmployee(Employee employee) {
        // Saving and returning the newly added employee with CREATED status
    	employee.setPassword(employee.getMobile());
    	
        Employee savedEmployee = repo.save(employee);
        
        
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Employee> viewEmployee(Long employeeId) {
        // Using Optional to handle if employee is not found
        Optional<Employee> employeeOpt = repo.findById(employeeId);
        if (employeeOpt.isPresent()) {
            return new ResponseEntity<>(employeeOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if employee not found
        }
    }

    @Override
    public ResponseEntity<List<Employee>> viewAllEmployees() {
        // Retrieving and returning all employees with OK status
        List<Employee> employees = repo.findAll();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteEmployee(Long employeeId) {
        // Finding employee by ID
        Optional<Employee> employeeOpt = repo.findById(employeeId);
        if (employeeOpt.isPresent()) {
            // If the employee is found, delete it and return success message
            repo.deleteById(employeeId);
            return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
        } else {
            // Return 404 if employee not found
            return new ResponseEntity<>("Employee not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<Employee> updateEmployee(Employee employee, Long employeeId) {
        // Fetch the existing employee to update
        Optional<Employee> employeeOpt = repo.findById(employeeId);
        if (employeeOpt.isPresent()) {
            Employee existingEmployee = employeeOpt.get();

            // Updating the fields of the existing employee
            existingEmployee.setEmployeeName(employee.getEmployeeName());
            existingEmployee.setDesignation(employee.getDesignation());
            existingEmployee.setDepartment(employee.getDepartment());
            existingEmployee.setSalary(employee.getSalary());
            existingEmployee.setAddress(employee.getAddress());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setJoinDate(employee.getJoinDate());
            existingEmployee.setMobile(employee.getMobile());
            

            // Saving the updated employee and returning it with OK status
            Employee updatedEmployee = repo.save(existingEmployee);
            return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
        } else {
            // Return 404 if employee not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

	@Override
	public Employee findByEmployeeIdAndPassword(Long employeeId, String employeeName) {
        Optional<Employee> employeeOptional = repo.findByEmployeeIdAndPassword(employeeId, employeeName);
        // Return the employee if found, otherwise return null
        return employeeOptional.orElse(null);
    }

	@Override
	public long getEmployeeCount() {
		return 	repo.count();
	}
}
