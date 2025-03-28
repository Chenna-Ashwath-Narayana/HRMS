import React, { useEffect, useState } from "react";
import axios from "axios";

import "../employeecomponentsstyles/Attendance.css";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem("employeeId");
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
      fetchAttendance(storedEmployeeId);
    } else {
      console.error("Invalid or missing Employee ID in localStorage");
    }
  }, []);

  const fetchAttendance = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/attendance/employee/${id}`
      );
      console.log("Attendance Data:", response.data);
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  return (
    <div className="attendance">
      <h1>Attendance Records</h1>
      {attendanceRecords.length > 0 ? (
        <div className="attendance-table-container"> {/* Scrollable div */}
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Employee Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.date}>
                  <td>{record.employeeId}</td>
                  <td>{record.date}</td>
                  <td>{record.employeeName}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
};

export default Attendance;
