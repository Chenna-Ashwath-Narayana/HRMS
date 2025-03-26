package com.hrms.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @Column(name = "employee_id") // Matches database column name
    private Long employeeId;
    private String employeeName;
    private String designation;
    private String department;
    private double salary;
    private String password; // Initial password can be set to mobile number
    private String mobile;   // New field for mobile number
    private String email;    // New field for email
    private LocalDate joinDate; // New field for join date
    private String address; // New field for address

    public Employee() {
        super();
    }

	public Employee(Long employeeId, String employeeName, String designation, String department, double salary,
			String password, String mobile, String email, LocalDate joinDate, String address) {
		super();
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.designation = designation;
		this.department = department;
		this.salary = salary;
		this.password = password;
		this.mobile = mobile;
		this.email = email;
		this.joinDate = joinDate;
		this.address = address;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(LocalDate joinDate) {
		this.joinDate = joinDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Employee [employeeId=" + employeeId + ", employeeName=" + employeeName + ", designation=" + designation
				+ ", department=" + department + ", salary=" + salary + ", password=" + password + ", mobile=" + mobile
				+ ", email=" + email + ", joinDate=" + joinDate + ", address=" + address + "]";
	}

	
   
}