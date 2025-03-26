package com.hrms.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.model.Attendance;
import com.hrms.service.AttendanceServiceImpl;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "*") // Allow frontend access
public class AttendanceController {

    @Autowired
    private AttendanceServiceImpl attendanceService;

 // Endpoint to mark attendance
    @PostMapping("/mark")
    public String markAttendance(@RequestBody List<Attendance> attendanceList) {
        attendanceService.markAttendance(attendanceList);
        return "Attendance marked successfully!";
    }

    @GetMapping("/list")
    public ResponseEntity<List<Attendance>> getAttendanceByDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Attendance> attendanceRecords = attendanceService.getAttendanceByDate(date);
        return ResponseEntity.ok(attendanceRecords);
    }


}

