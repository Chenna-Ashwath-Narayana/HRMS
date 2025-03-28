import React, { useState } from 'react';
import axios from 'axios';

const Forgotpassword = () => {
  const [mobile, setMobile] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = () => {
    axios.post('http://localhost:9000/employee/forgot-password', { mobile })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error sending reset link:', error);
        setMessage('Error sending reset link.');
      });
  };

  const handleResetPassword = () => {
    axios.post('http://localhost:9000/employee/reset-password', { token, newPassword })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error updating password:', error);
        setMessage('Error updating password.');
      });
  };

  return (
    <div>
      <h2 className='employeeforgotpassword-container'>Forgot Password</h2>
      <input 
        type="text" 
        placeholder="Mobile Number" 
        value={mobile} 
        onChange={(e) => setMobile(e.target.value)} 
      />
      <button onClick={handleForgotPassword}>Send Reset Link</button>

      <h3>Reset Password</h3>
      <input 
        type="text" 
        placeholder="Token" 
        value={token} 
        onChange={(e) => setToken(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="New Password" 
        value={newPassword} 
        onChange={(e) => setNewPassword(e.target.value)} 
      />
      <button onClick={handleResetPassword}>Reset Password</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Forgotpassword;