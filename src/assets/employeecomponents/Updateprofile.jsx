import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../employeecomponentsstyles/UpdateProfile.css'; 

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    mobile: '',
    designation: '',
    department: '',
    email: '',
    address: '',
    joinDate: ''
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employeeData'));
    if (!data) {
      navigate('/employeepage');
    } else {
      setEmployeeData(data);
      setFormData(data); // Set initial form data to employee data
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update form data state as fields change
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:9000/employee/updateEmployee/${formData.employeeId}`, // Use backticks properly
        formData
      );
  
      if (response.status === 200) {
        localStorage.setItem('employeeData', JSON.stringify(formData)); // Save updated data in local storage
        alert('Profile updated successfully!');
        // navigate('/view-profile'); 
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };
  

  return (
    <div className='update-profile-container'>
      <h1 className='title'>Update Profile</h1>
      <form className='update-profile-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <div className='form-field1'>
            <label>Employee ID:</label>
            <input type='text' name='employeeId' value={formData.employeeId} readOnly />
          </div>
          <div className='form-field1'>
            <label>Employee Name:</label>
            <input type='text' name='employeeName' value={formData.employeeName} onChange={handleChange} required />
          </div>
        </div>
        <div className='form-group'>
          <div className='form-field1'>
            <label>Phone No:</label>
            <input type='tel' name='mobile' value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className='form-field1'>
            <label>Designation:</label>
            <input type='text' name='designation' value={formData.designation} onChange={handleChange} required />
          </div>
        </div>
        <div className='form-group'>
          <div className='form-field1'>
            <label>Department:</label>
            <input type='text' name='department' value={formData.department} onChange={handleChange} required />
          </div>
          <div className='form-field1'>
            <label>Email Id:</label>
            <input type='email' name='email' value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className='form-group'>
          <div className='form-field1'>
            <label>Address:</label>
            <textarea name='address' value={formData.address} onChange={handleChange} required />
          </div>
          <div className='form-field1'>
            <label>Joining Date:</label>
            <input type='date' name='joinDate' value={formData.joinDate} onChange={handleChange} required />
          </div>
        </div>
        <button type='submit' className='submit-button'>Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
