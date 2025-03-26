package com.hrms.service;

import java.time.LocalDate;
import java.util.List;

import com.hrms.model.Attendance;

public interface AttendanceService {

	 public void markAttendance(List<Attendance> attendanceList);
	 public List<Attendance> getAttendanceByDate(LocalDate date);
}
