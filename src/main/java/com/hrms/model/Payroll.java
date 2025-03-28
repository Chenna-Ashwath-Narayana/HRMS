package com.hrms.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id")
    private Long employeeId;

    private Double salaryPaid;
    private String month;
    private int year;
    private LocalDate paymentDate;
    
	public Payroll() {
		super();
	}

	public Payroll(Long id, Long employeeId, Double salaryPaid, String month, int year, LocalDate paymentDate) {
		super();
		this.id = id;
		this.employeeId = employeeId;
		this.salaryPaid = salaryPaid;
		this.month = month;
		this.year = year;
		this.paymentDate = paymentDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public Double getSalaryPaid() {
		return salaryPaid;
	}

	public void setSalaryPaid(Double salaryPaid) {
		this.salaryPaid = salaryPaid;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	@Override
	public String toString() {
		return "Payroll [id=" + id + ", employeeId=" + employeeId + ", salaryPaid=" + salaryPaid + ", month=" + month
				+ ", year=" + year + ", paymentDate=" + paymentDate + "]";
	}

	
	
	    
    
}
