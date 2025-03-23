import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admincomponentsstyles/AdminAttendance.css'; // You can add custom styles

const Adminattendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date

  useEffect(() => {
    // Fetch all employees
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get('http://localhost:9000/employees/list') // Replace with your actual API endpoint
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error('Error fetching employees:', error));
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
      date: date,
      status: attendance[employee.employeeId] || 'Absent', // Default to 'Absent' if not marked
    }));

    // Send attendance data to the backend
    axios
      .post('http://localhost:9000/attendance/mark', { attendance: attendanceData })
      .then((response) => alert('Attendance marked successfully!'))
      .catch((error) => console.error('Error marking attendance:', error));
  };

  return (
    <div className="admin-attendance">
      <h1>Mark Attendance</h1>

      <div className="attendance-date">
        <label>Select Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

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
                  value={attendance[employee.employeeId] || 'Absent'}
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

      <button className="submit-attendance-btn" onClick={handleSubmitAttendance}>
        Submit Attendance
      </button>
    </div>
  );
};

export default Adminattendance;
