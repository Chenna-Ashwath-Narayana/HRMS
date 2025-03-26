package com.hrms.service;

import java.util.List;
import org.springframework.http.ResponseEntity;
import com.hrms.model.Employee;

public interface EmployeeService {

    public ResponseEntity<Employee> addEmployee(Employee employee);
    public ResponseEntity<Employee> viewEmployee(Long employeeId);
    public ResponseEntity<List<Employee>> viewAllEmployees();
    public ResponseEntity<String> deleteEmployee(Long employeeId);
    public ResponseEntity<Employee> updateEmployee(Employee employee, Long employeeId);
    
    public Employee findByEmployeeIdAndPassword(Long employeeId , String password);
    
    public long getEmployeeCount();
}
