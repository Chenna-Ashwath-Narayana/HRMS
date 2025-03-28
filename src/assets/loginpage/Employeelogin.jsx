import React, { useState } from 'react';
import './Employeelogin.css';
import axios from 'axios';
import { FiEye, FiEyeOff, FiUser, FiKey, FiLinkedin, FiFacebook, FiTwitter } from "react-icons/fi"; 
import loginlogoremovebgpreview from '../images/loginlogo-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

const Employeelogin = () => {
  const navigate = useNavigate();
  
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
      // Sending GET request with employeeId and password as query parameters
      const response = await axios.get(`http://localhost:9000/employee/findbyEmployeeIdAndPassword`, {
        params: {
          employeeId: employeeId,
          password: password
        }
      });

      if (response.status === 200) {
        const employeeData = response.data;
        console.log("Login successful", employeeData);
        
        // Store employee data in local storage for use in other components
        localStorage.setItem('employeeData', JSON.stringify(employeeData));
        localStorage.setItem("employeeId", employeeData.employeeId);
        console.log("Stored employeeId:", localStorage.getItem("employeeId"));

        // Navigate to employee main page
        navigate('/employeepage');
        console.log("Navigating to /employeepage");
      } else {
        alert("Login failed: Employee not found or incorrect password.");
      }
    } catch (error) {
      if (error.response) {
        // Handle error based on response status code
        if (error.response.status === 404) {
          alert("Login failed: Employee not found or incorrect password.");
        } else {
          alert(`Error: ${error.response.data.message || "An unexpected error occurred."}`);
        }
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
      <div className='homepage-container'>
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
            </a>
        </div>
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
          type="text" // Changed to text since Employee ID can be alphanumeric or other formats
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
        <a href='/employeeforgotpassword'>Forgot your password?</a>
      </div>

      <div className='footer-container'>
        <div className='socialmedia-container'>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FiLinkedin size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FiFacebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FiTwitter size={20} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Employee Management System</p>
      </div>
    </div>
  );
};

export default Employeelogin;