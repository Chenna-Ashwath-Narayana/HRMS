import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../employeecomponentsstyles/Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:9000/attendance/employee');
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  return (
    <div className="attendance">
      <h1>Attendance Records</h1>
      {attendanceRecords.length > 0 ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.loginTime}</td>
                <td>{record.logoutTime}</td>
                <td>{record.workingHours.toFixed(2)} hours</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

export default Attendance;
