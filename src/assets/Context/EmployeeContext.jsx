import { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);

  const login = (employeeData) => {
    setEmployee(employeeData);
    localStorage.setItem("employee",JSON.stringify(employeeData));
    console.log("Login called with:", employeeData); // Log when login is called
    setEmployee(employeeData);
    console.log("Employee data stored in context:", employeeData); // Log after setting state
  };

  const logout = () => {
    console.log("Logout called");
    setEmployee(null);
    localStorage.removeItem('isLoggedIn'); // Optional: If you're using localStorage to track login status
  };

  return (
    <EmployeeContext.Provider value={{ employee, login, logout }}>
      {children}
    </EmployeeContext.Provider>
  );
};
  
