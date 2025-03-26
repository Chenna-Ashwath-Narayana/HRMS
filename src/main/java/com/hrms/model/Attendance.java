package com.hrms.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String employeeName;
    private LocalDate date;
    private String status; // Present, Absent, Leave

    // Constructors
    public Attendance() {}

    public Attendance(Long employeeId, String employeeName, LocalDate date, String status) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.date = date;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

	@Override
	public String toString() {
		return "Attendance [id=" + id + ", employeeId=" + employeeId + ", employeeName=" + employeeName + ", date="
				+ date + ", status=" + status + "]";
	}
    
    
}

