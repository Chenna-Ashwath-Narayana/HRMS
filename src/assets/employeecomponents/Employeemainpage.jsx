import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../employeecomponentsstyles/Employeemainpage.css';
import { useEmployee } from '../Context/EmployeeContext'; // Assuming you're using the context for login/logout

const Employeemainpage = () => {
  const { logout } = useEmployee(); // Use logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate('/');
  };

  return (
    <div className="employeepage-container">
      <div className="employeepage-sidebar-container">
        <div className="sidebar">
          <Link to="employeedashboard">Dashboard</Link>
        </div>
        <div className="sidebar">
          <Link to="view-profile">View Profile</Link>
        </div>
        <div className="sidebar">
          <Link to="update-profile">Update Profile</Link>
        </div>
        <div className="sidebar">
          <Link to="payroll">Payroll Details</Link>
        </div>
        <div className="sidebar">
          <Link to="leave-requests">Leave Requests</Link>
        </div>
        <div className='sidebar'>
          <Link to="notices" >Notices</Link>
        </div>
        <div className="sidebar">
          <Link to="attendance-management">Attendance</Link>
        </div>
        <div className="sidebar">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="employeepage-main-container">
        {/* Renders the nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Employeemainpage;
