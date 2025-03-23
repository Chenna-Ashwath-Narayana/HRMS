import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Viewprofile = () => {
  const [employee, setEmployee] = useState(null); // State to store employee details
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState('');         // Error state

  // Retrieve employeeId and password from localStorage or context
  const employeeId = localStorage.getItem("employeeId");
  const password = localStorage.getItem("password");

  useEffect(() => {
    // Fetch employee details when the component mounts
    const fetchEmployeeDetails = async () => {
      try {
        if (!employeeId || !password) {
          throw new Error('You are not logged in.');
        }
        
        setLoading(true);
        // Fetching employee details based on employeeId and password
        const response = await axios.get(`http://localhost:9000/employee/getemployee/${employeeId}`, {
          headers: {
            'Authorization': `Basic ${btoa(`${employeeId}:${password}`)}` // Encoding credentials
          }
        });
        setEmployee(response.data); // Set the employee details
      } catch (err) {
        setError(err.message || 'Failed to load employee details. Please try again.');
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchEmployeeDetails();
  }, [employeeId, password]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message
  if (error) {
    return <div>{error}</div>;
  }

  // Render employee details if available
  return (
    <div>
      <h1>View Profile</h1>
      {employee ? (
        <div>
          <p><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p><strong>Employee Name:</strong> {employee.employeeName}</p>
          <p><strong>Designation:</strong> {employee.designation}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>No employee details found.</p>
      )}
    </div>
  );
};

export default Viewprofile;
