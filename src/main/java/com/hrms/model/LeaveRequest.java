package com.hrms.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class LeaveRequest {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private Long employeeId;
	    private String employeeName;
	    private String leaveType;
	    
	    @Temporal(TemporalType.DATE)
	    private Date startDate;
	    
	    @Temporal(TemporalType.DATE)
	    private Date endDate;
	    
	    private String reason;
	    private String additionalInfo;
	    private String status = "Pending";
	    
		public LeaveRequest() {
			super();
		}

		public LeaveRequest(Long id, Long employeeId, String employeeName, String leaveType, Date startDate,
				Date endDate, String reason, String additionalInfo, String status) {
			super();
			this.id = id;
			this.employeeId = employeeId;
			this.employeeName = employeeName;
			this.leaveType = leaveType;
			this.startDate = startDate;
			this.endDate = endDate;
			this.reason = reason;
			this.additionalInfo = additionalInfo;
			this.status = status;
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

		public String getEmployeeName() {
			return employeeName;
		}

		public void setEmployeeName(String employeeName) {
			this.employeeName = employeeName;
		}

		public String getLeaveType() {
			return leaveType;
		}

		public void setLeaveType(String leaveType) {
			this.leaveType = leaveType;
		}

		public Date getStartDate() {
			return startDate;
		}

		public void setStartDate(Date startDate) {
			this.startDate = startDate;
		}

		public Date getEndDate() {
			return endDate;
		}

		public void setEndDate(Date endDate) {
			this.endDate = endDate;
		}

		public String getReason() {
			return reason;
		}

		public void setReason(String reason) {
			this.reason = reason;
		}

		public String getAdditionalInfo() {
			return additionalInfo;
		}

		public void setAdditionalInfo(String additionalInfo) {
			this.additionalInfo = additionalInfo;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		@Override
		public String toString() {
			return "LeaveRequest [id=" + id + ", employeeId=" + employeeId + ", employeeName=" + employeeName
					+ ", leaveType=" + leaveType + ", startDate=" + startDate + ", endDate=" + endDate + ", reason="
					+ reason + ", additionalInfo=" + additionalInfo + ", status=" + status + "]";
		}

		
}
