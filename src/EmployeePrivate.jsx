// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEmployee } from '../src/assets/Context/EmployeeContext';

const EmployeePrivate = ({ children }) => {
  const { employee } = useEmployee();

  if (!employee) {
    // If employee is not logged in, redirect to login page
    return <Navigate to="/employeelogin" />;
  }

  // If employee is logged in, allow access to the route
  return children;
};

export default EmployeePrivate;
