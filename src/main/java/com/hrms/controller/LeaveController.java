package com.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.LeaveRequest;
import com.hrms.service.LeaveService;
import com.hrms.service.LeaveServiceImpl;

@RestController
@RequestMapping("/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveServiceImpl leaveService;

    @PostMapping("/saveleaves")
    public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        LeaveRequest createdLeaveRequest = leaveService.createLeaveRequest(leaveRequest);
        return new ResponseEntity<>(createdLeaveRequest, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
        List<LeaveRequest> leaveRequests = leaveService.getAllLeaveRequests();
        return new ResponseEntity<>(leaveRequests, HttpStatus.OK);
    }

    @PutMapping("updateLeave/{employeeId}")
    public ResponseEntity<?> updateLeaveRequest(@PathVariable Long employeeId, @RequestBody LeaveRequest leaveRequest) {
        LeaveRequest updatedRequest = leaveService.updateLeaveRequest(employeeId, leaveRequest);
        if (updatedRequest != null) {
            return new ResponseEntity<>(updatedRequest, HttpStatus.OK);
        } else {
            // Sending a custom error response if the employeeId is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Leave request for employeeId " + employeeId + " not found.");
        }
    }


    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsByEmployeeId(@PathVariable Long employeeId) {
        List<LeaveRequest> leaveRequests = leaveService.getLeaveRequestsByEmployeeId(employeeId);
        if (!leaveRequests.isEmpty()) {
            return new ResponseEntity<>(leaveRequests, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null); // No content if no leaves found
        }
    }
    
    
}