import React, { useState } from 'react';
import './Adminlogin.css';
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importing eye icons

import axios from 'axios';

import loginlogoremovebgpreview from '../images/loginlogo-removebg-preview.png'

const Adminlogin = () => {

  // useState hook to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Get current year
  const currentYear = new Date().getFullYear();
  // Get current date in the format "MM/DD/YYYY"
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const currentDate = new Date().toLocaleDateString("en-US", options);

  // Function to handle login (backend call)
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  // Function to handle login (backend call)
  const handleLogin = async () => {
    // Clear any previous errors and set loading state
    setLoading(true);
    // setErrorMessage('');

    // Ensure adminId and password are not empty
    if (!adminId || !password) {
      alert('Please enter both adminId and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:9000/admin/getadmin/${adminId}/${password}`);

      if (response.status === 200) {
          console.log("Login successful", response.data);
          localStorage.setItem("isLoggedIn", true); // Set login status
          // Redirect to another page on successful login (e.g., dashboard)
          window.location.href = "/adminmainpage";
      }
  } catch (error) {
      if (error.response && error.response.status === 404) {
          // Alert user if credentials don't match
          alert("Login failed: Admin not found or incorrect password.");
      } else {
          // Handle any other errors
          console.error("Error during login:", error);
          alert("An unexpected error occurred. Please try again.");
      }
  } finally {
      setLoading(false); // Stop loading when request is done
  } 
  };


  return (
    <>
      <div className='home-container'>
        <div className='homepage-container'>
            <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-bi-house-door" viewBox="0 0 16 16">
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
            </a>
        </div>
        <div className='image-container'>
          <div>
                <img src={loginlogoremovebgpreview} alt="" />
          </div>
          <div>
                <h2>HR MANAGEMENT SYSTEM</h2>
          </div>
        </div>
        <div className='main-container'>
          <h2>ADMIN LOGIN</h2>
            <label htmlFor="username">
                <svg xmlns="http://www.w3.org/2000/svg" className="bi-bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg><span>Username</span>
            </label> <br />

            <input 
              type="number" 
              name="adminId" 
              id="adminId" 
              placeholder="Enter Admin ID" 
              value={adminId} // Make sure it is connected to the state
              onChange={(e) => setAdminId(e.target.value)} // Update state on change
              required
            />
          <br />

            <label htmlFor="password">
                <svg xmlns="http://www.w3.org/2000/svg" className="bi-bi-key" viewBox="0 0 16 16">
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg><span>Password</span>
          </label>
          <br />

          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            id="password" 
            placeholder="Enter Password" 
            value={password} // Make sure it is connected to the state
            onChange={(e) => setPassword(e.target.value)} 
            required
          />

          <span onClick={togglePasswordVisibility} className='eyeicon'>
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </span>
          <br />
          <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>

            
            <br />

          <a href='/adminforgotpassword'>Forgot your password</a>
        </div>
        <div className='footer-container'>
          <div className='socialmedia-container'>
            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-linkedin" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3.23 3.23 0 0 1-.617-.057 3.29 3.29 0 0 0 3.067 2.28A6.594 6.594 0 0 1 0 13.027a9.29 9.29 0 0 0 5.026 1.472" />
            </svg>
          </div>
          <div className='copyright-container'>
            <p>&copy; 2005 - {currentYear} All rights reserved | {currentDate}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminlogin;
