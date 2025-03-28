package com.hrms.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrms.model.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
	
	Optional<Employee> findByEmployeeIdAndPassword(Long employeeId , String employeeName);
//	Optional<Employee> findByEmployeeId(Long employeeId);
	Optional<Employee> findByEmployeeId(Long employeeId);
//	boolean existsById(Long employeeId);
	boolean existsByEmployeeId(Long employeeId);
	
	long count();
}
