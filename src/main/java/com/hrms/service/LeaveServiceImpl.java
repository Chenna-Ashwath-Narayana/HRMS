package com.hrms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.model.LeaveRequest;
import com.hrms.repo.LeaveRepository;

@Service
public class LeaveServiceImpl implements LeaveService {

	@Autowired
    private LeaveRepository leaveRepository;

    @Override
    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        return leaveRepository.save(leaveRequest);
    }

    @Override
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRepository.findAll();
    }

    @Override
    public LeaveRequest updateLeaveRequest(Long employeeId, LeaveRequest leaveRequest) {
        Optional<LeaveRequest> existingRequest = leaveRepository.findByEmployeeId(employeeId);
        if (existingRequest.isPresent()) {
            LeaveRequest requestToUpdate = existingRequest.get();
           /* requestToUpdate.setLeaveType(leaveRequest.getLeaveType());
            requestToUpdate.setStartDate(leaveRequest.getStartDate());
            requestToUpdate.setEndDate(leaveRequest.getEndDate());
            requestToUpdate.setReason(leaveRequest.getReason());
            requestToUpdate.setAdditionalInfo(leaveRequest.getAdditionalInfo());*/
            requestToUpdate.setStatus(leaveRequest.getStatus()); // If you want status to be updated as well
            return leaveRepository.save(requestToUpdate);
        }
        return null; // You might want to throw an exception instead
    }

    @Override
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId) {
        return leaveRepository.findAllByEmployeeId(employeeId);
    }

}
