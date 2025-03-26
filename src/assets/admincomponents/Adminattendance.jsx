import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Admincomponentsstyles/AdminAttendance.css"; // Import CSS file

const Adminattendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
  const [attendanceList, setAttendanceList] = useState([]); // List of attendance records
  const [leaveList, setLeaveList] = useState([]); // List of employees on leave

  useEffect(() => {
    fetchEmployees();
    fetchAttendanceByDate(date);
  }, [date]); // Fetch attendance records when date changes

  const fetchEmployees = () => {
    axios
      .get("http://localhost:9000/employee/listEmployee") // API to get employees
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const fetchAttendanceByDate = (selectedDate) => {
    axios
      .get(`http://localhost:9000/attendance/list?date=${selectedDate}`)
      .then((response) => {
        setAttendanceList(response.data);
        setLeaveList(response.data.filter((record) => record.status === "Leave"));
      })
      .catch((error) => console.error("Error fetching attendance:", error));
  };

  const handleAttendanceChange = (employeeId, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [employeeId]: status,
    }));
  };

  const handleSubmitAttendance = () => {
    const attendanceData = employees.map((employee) => ({
      employeeId: employee.employeeId,
      employeeName: employee.employeeName,
      date: date,
      status: attendance[employee.employeeId] || "Absent", // Default to Absent if not selected
    }));

    axios
      .post("http://localhost:9000/attendance/mark", attendanceData)
      .then(() => {
        alert("Attendance marked successfully!");
        fetchAttendanceByDate(date); // Refresh attendance list after submission
      })
      .catch((error) => console.error("Error marking attendance:", error));
  };

  return (
    <div className="admin-attendance">
      <h1>Mark Attendance</h1>

      {/* Date Picker */}
      <div className="attendance-date">
        <label>Select Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {/* Attendance Table (Scrollable) */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.employeeName}</td>
                <td>
                  <select
                    value={attendance[employee.employeeId] || "Absent"}
                    onChange={(e) => handleAttendanceChange(employee.employeeId, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="submit-attendance-btn" onClick={handleSubmitAttendance}>
        Submit Attendance
      </button>

      {/* Attendance List (Scrollable) */}
      <div className="attendance-list-container">
        <h2>Attendance Records for {date}</h2>
        <div className="attendance-list-scroll">
          <table className="attendance-list-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.length > 0 ? (
                attendanceList.map((record) => (
                  <tr key={record.id}>
                    <td>{record.employeeId}</td>
                    <td>{record.employeeName}</td>
                    <td>{record.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminattendance;
