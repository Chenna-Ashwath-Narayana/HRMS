package com.hrms.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrms.model.Attendance;
import com.hrms.repo.AttendanceRepository;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

	@Override
	public void markAttendance(List<Attendance> attendanceList) {
        attendanceRepository.saveAll(attendanceList);
		
	}

	@Override
	public List<Attendance> getAttendanceByDate(LocalDate date) {
		return attendanceRepository.findByDate(date);
	}

    
}
