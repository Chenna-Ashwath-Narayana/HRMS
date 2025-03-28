package com.hrms.service;

import java.util.List;

import com.hrms.model.LeaveRequest;

public interface LeaveService {

	LeaveRequest createLeaveRequest(LeaveRequest leaveRequest);
    List<LeaveRequest> getAllLeaveRequests();
    LeaveRequest updateLeaveRequest(Long employeeId, LeaveRequest leaveRequest);
    List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId);
}
