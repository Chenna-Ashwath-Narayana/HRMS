package com.hrms.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrms.model.LeaveRequest;

@Repository
public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {

	// To find a single leave request by employeeId
    Optional<LeaveRequest> findByEmployeeId(Long employeeId);
    
    // To find all leave requests for an employee by employeeId
    List<LeaveRequest> findAllByEmployeeId(Long employeeId);

}
