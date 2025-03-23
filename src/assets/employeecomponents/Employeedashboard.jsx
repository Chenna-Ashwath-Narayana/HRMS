import React from 'react';
import '../employeecomponentsstyles/Employeedashboard.css';
import { useEmployee } from '../Context/EmployeeContext'; // Import the EmployeeContext

const Employeedashboard = () => {
  const { employee } = useEmployee(); // Get the employee data from context
  console.log("Employee Data from context in dashboard: " , employee);



  return (
    <div className='dashboard-container'>
      <h1>Employee Dashboard</h1>
      {/* Display employee name and ID */}
      <div className='employee-details'>
        <p><strong>Employee Name:</strong> {employee.employeeName || 'N/A'}</p>
        <p><strong>Employee ID:</strong> {employee?.employeeId || 'N/A'}</p>
        <p><strong>Employee Address:</strong>{employee.address || 'N/A'}</p>
      </div>
      {/* Additional dashboard content */}
    </div>
  );
};

export default Employeedashboard;
