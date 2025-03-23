import { Navigate } from "react-router-dom";

const Privateroute = ({ children }) => {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/adminlogin" />;

  return isLoggedIn ? children : <Navigate to="/employeepage" />;
  
};

export default Privateroute;
