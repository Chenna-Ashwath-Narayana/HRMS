import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../employeecomponentsstyles/Employeedashboard.css";

const Employeedashboard = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
 const [clientscount, setClientsCount] = useState(0);
   const [latestNotice, setLatestNotice] = useState(null);

  useEffect(() => {
    // Retrieve employee data from localStorage
    const storedEmployee = JSON.parse(localStorage.getItem("employeeData"));
    if (!storedEmployee) {
      navigate("/adminlogin"); // Redirect if no employee data is found
    } else {
      setEmployeeData(storedEmployee);
    }
  }, []); // ✅ Removed `navigate` from dependency array

  // ✅ Fetch Latest Notice
    useEffect(() => {
      fetch("http://localhost:9000/notice/latest")
        .then((response) => response.json())
        .then((data) => setLatestNotice(data))
        .catch((error) => console.error("Error fetching notice:", error));
    }, []);
  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>

      {/* Employee Details Section */}
      <div className="employee-details">
        <h2>Employee Information</h2>
        <p>
          <strong>Employee Name:</strong> {employeeData?.employeeName || "N/A"}
        </p>
        <p>
          <strong>Employee ID:</strong> {employeeData?.employeeId || "N/A"}
        </p>
        <p>
          <strong>Department:</strong> {employeeData?.department || "N/A"}
        </p>
        <p>
          <strong>Designation:</strong> {employeeData?.designation || "N/A"}
        </p>
      </div>

      {/* Latest Notice */}
      <div className="second-page-container">
        
        {latestNotice ? (
        <div className="dashboard-notice-box">
          <h3>{latestNotice.noticeTitle}</h3>
          <p><strong>Department:</strong> {latestNotice.department}</p>
          <p><strong>Date:</strong> {new Date(latestNotice.noticeDate).toLocaleDateString()}</p>
          <p><strong>Details:</strong> {latestNotice.noticeDetails}</p>
          <small><strong>Created At:</strong> {new Date(latestNotice.createdAt).toLocaleString()}</small>
        </div>
      ) : (
        <p>No latest notices available.</p>
      )}

        
      </div>
    </div>
  );
};

export default Employeedashboard;
