package com.hrms.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrms.model.Payroll;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    List<Payroll> findByEmployeeId(Long employeeId);

}
