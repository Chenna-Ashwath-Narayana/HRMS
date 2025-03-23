import React, { useState } from 'react';
import './Employeelogin.css';
import axios from 'axios';
import { FiEye, FiEyeOff, FiUser, FiKey, FiLinkedin, FiFacebook, FiTwitter } from "react-icons/fi"; 
import loginlogoremovebgpreview from '../images/loginlogo-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../Context/EmployeeContext'; // Use EmployeeContext

const Employeelogin = () => {
  const navigate = useNavigate();
  const { login } = useEmployee(); // Use Employee login context

  const [showPassword, setShowPassword] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setLoading(true);

    if (!employeeId || !password) {
      alert('Please enter both Employee ID and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:9000/employee/findbyEmployeeIdAndPassword/${employeeId}/${password}`);

      if (response.status === 200) {
        const employeeData = response.data;
        console.log("Login successful", employeeData);
        // Store employee data in context
        login(employeeData);
        // login({
        //   employeeId: employeeData.employeeId,
        //   employeeName: employeeData.employeeName,
        // });

        // Navigate to main page
        navigate('/employeepage');
        console.log("Navigating to /employeemainpage"); // Check if this gets logged
      } else {
        alert("Login failed: Employee not found or incorrect password.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Login failed: Employee not found or incorrect password.");
      } else {
        console.error("Error during login:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home-container'>
      <div className='image-container'>
        <img src={loginlogoremovebgpreview} alt="Employee Logo" />
        <h2>EMPLOYEE MANAGEMENT</h2>
      </div>

      <div className='main-container'>
        <h2>EMPLOYEE LOGIN</h2>
        <label htmlFor="employeeId">
          <FiUser size={20} /> <span>Username</span>
        </label> <br />
        <input 
          type="number" 
          name="employeeId" 
          id="employeeId" 
          placeholder="Enter Employee ID" 
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)} 
          required
        />
        <br />

        <label htmlFor="password">
          <FiKey size={20} /> <span>Password</span>
        </label><br />
        <input 
          type={showPassword ? "text" : "password"} 
          name="password" 
          id="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <span onClick={togglePasswordVisibility} className='eyeicon'>
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </span>
        <br />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button><br />
        <a href='/forgot'>Forgot your password?</a>
      </div>

      <div className='footer-container'>
        <div className='socialmedia-container'>
          <a href="https://linkedin.com">
            <FiLinkedin size={20} />
          </a>
          <a href="https://facebook.com">
            <FiFacebook size={20} />
          </a>
          <a href="https://twitter.com">
            <FiTwitter size={20} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Employee Management System</p>
      </div>
    </div>
  );
};

export default Employeelogin;
