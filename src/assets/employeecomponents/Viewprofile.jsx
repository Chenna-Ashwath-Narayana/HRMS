import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../employeecomponentsstyles/Viewprofile.css'; // Import regular CSS file

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const employeeData = JSON.parse(localStorage.getItem('employeeData'));

  useEffect(() => {
    if (!employeeData) {
      // Redirect to login if there is no employee data
      navigate('/adminlogin');
    }
  }, [employeeData, navigate]);

  return (
    <div className='dashboard-container'>
      <h1 className='title'>Personal Information</h1>
      <h2 className='employeename'>{employeeData.employeeName}</h2>
      <div className='employee-details'>
        <div className='detail-card'>
          <table>
            <tr>
              <td>Emloyee Id :</td>
              <td>{employeeData.employeeId}</td>
            </tr>
            <tr>
              <td>Phone No :</td>
              <td>{employeeData.mobile}</td>
            </tr>
            <tr>
              <td>Designation :</td>
              <td>{employeeData.designation}</td>
            </tr>
            <tr>
              <td>Department :</td>
              <td>{employeeData.department}</td>
            </tr>
            <tr>
              <td>Salary :</td>
              <td>{employeeData.salary}</td>
            </tr>
            <tr>
              <td>Email Id :</td>
              <td>{employeeData.email}</td>
            </tr>
            <tr>
              <td>Address :</td>
              <td>{employeeData.address}</td>
            </tr>
            <tr>
              <td>Joining Date :</td>
              <td>{employeeData.joinDate}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;