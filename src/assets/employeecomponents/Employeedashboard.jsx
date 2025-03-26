import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../employeecomponentsstyles/Employeedashboard.css';

const Employeedashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  const [logoutTime, setLogoutTime] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    // Retrieve employee data from localStorage
    const storedEmployee = JSON.parse(localStorage.getItem('employeeData'));
    if (!storedEmployee) {
      navigate('/adminlogin'); // Redirect if no employee data is found
    } else {
      setEmployeeData(storedEmployee);
    }

    // Retrieve login status
    const storedStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedStatus) {
      setIsLoggedIn(storedStatus);
      setLoginTime(localStorage.getItem('loginTime'));
    }
  }, [navigate]);

  // Handle toggle login/logout
  const handleToggle = () => {
    if (!isLoggedIn) {
      const login = new Date();
      setLoginTime(login);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loginTime', login);

      // API call to register login time
      axios.post('http://localhost:9000/attendance/login', {
        employeeId: employeeData?.employeeId,
        loginTime: login,
      });
    } else {
      const logout = new Date();
      setLogoutTime(logout);
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');

      const loggedInTime = new Date(loginTime);
      const timeWorked = (logout - loggedInTime) / (1000 * 60 * 60); // Convert milliseconds to hours
      setWorkingHours(timeWorked);
      localStorage.removeItem('loginTime');

      // API call to store logout time and working hours
      axios.post('http://localhost:9000/attendance/logout', {
        employeeId: employeeData?.employeeId,
        loginTime: loginTime,
        logoutTime: logout,
        workingHours: timeWorked.toFixed(2),
      });
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>

      {/* Employee Details Section */}
      <div className="employee-details">
        <h2>Employee Information</h2>
        <p><strong>Employee Name:</strong> {employeeData?.employeeName || 'N/A'}</p>
        <p><strong>Employee ID:</strong> {employeeData?.employeeId || 'N/A'}</p>
        <p><strong>Department:</strong> {employeeData?.department || 'N/A'}</p>
        <p><strong>Designation:</strong> {employeeData?.designation || 'N/A'}</p>
      </div>

      {/* Attendance Section */}
      <div className="attendance-section">
        <h2>Attendance</h2>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={isLoggedIn}
            onChange={handleToggle}
          />
          {isLoggedIn ? 'Logout' : 'Login'}
        </label>

        {isLoggedIn && <p><strong>Logged in since:</strong> {new Date(loginTime).toLocaleString()}</p>}
        {logoutTime && <p><strong>Logout time:</strong> {new Date(logoutTime).toLocaleString()}</p>}
        {workingHours !== null && <p><strong>Total Working Hours:</strong> {workingHours.toFixed(2)} hrs</p>}
      </div>
    </div>
  );
};

export default Employeedashboard;
