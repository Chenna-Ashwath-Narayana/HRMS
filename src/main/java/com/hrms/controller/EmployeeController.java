package com.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hrms.model.Employee;
import com.hrms.service.EmployeeServiceImpl;

@RestController  // Use @RestController instead of @Controller + @ResponseBody
@RequestMapping("/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired     private EmployeeServiceImpl service;

    // Return a welcome message
    @GetMapping("/test")
    public ResponseEntity<String> message() {
        return new ResponseEntity<>("Welcome to the Employee Page", HttpStatus.OK);
    }

    // Add a new employee and return an appropriate message
    @PostMapping("/addemployee")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        // Directly returning ResponseEntity from service layer
        return service.addEmployee(employee);
    }

    // Get employee details by employeeId
    @GetMapping("/getemployee/{employeeId}")
    public ResponseEntity<Employee> getOneEmployee(@PathVariable("employeeId") Long employeeId) {
        // Directly returning ResponseEntity from service layer
        return service.viewEmployee(employeeId);
    }

    // Get all employees
    @GetMapping("/listEmployee")
    public ResponseEntity<List<Employee>> listEmployees() {
        // Directly returning ResponseEntity from service layer
        return service.viewAllEmployees();
    }

    // Update employee details
    @PutMapping("/updateEmployee/{employeeId}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee, @PathVariable("employeeId") Long employeeId) {
        // Directly returning ResponseEntity from service layer
        return service.updateEmployee(employee, employeeId);
    }

    // Delete employee by employeeId
    @DeleteMapping("/deleteEmployee/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("employeeId") Long employeeId) {
        // Directly returning ResponseEntity from service layer
        return service.deleteEmployee(employeeId);
    }
    
    
    @GetMapping("/findbyEmployeeIdAndPassword")
    public ResponseEntity<Employee> findEmployeeByEmployeeIdAndPassword(
        @RequestParam("employeeId") Long employeeId, 
        @RequestParam("password") String password) {
        
        Employee employee = service.findByEmployeeIdAndPassword(employeeId, password);
        
        if (employee != null) {
            return ResponseEntity.ok(employee); // Return HTTP 200 with the employee
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return HTTP 404 if employee not found
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getEmployeeCount() {
        long count = service.getEmployeeCount();
        return ResponseEntity.ok(count);
    }
    
}
