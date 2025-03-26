import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';
import '../employeecomponentsstyles/LeaveRequest.css';

const LeaveRequest = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [leaveRequest, setLeaveRequest] = useState({
    startDate: '',
    endDate: '',
    leaveType: '',
    reason: '',
    additionalInfo: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]); // State to store leave requests

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employeeData'));
    if (!data) {
      navigate('/adminlogin');
    } else {
      setEmployeeData(data);
      fetchLeaveRequests(data.employeeId);
    }
  }, [navigate]);

  // Fetch leave requests for the employee
  const fetchLeaveRequests = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:9000/leaves/employee/${employeeId}`);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequest({
      ...leaveRequest,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!employeeData) {
      setLeaveStatus('Employee data not found.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/leaves/saveleaves', {
        employeeId: employeeData.employeeId,
        employeeName: employeeData.employeeName,
        ...leaveRequest,
      });

      setLeaveStatus('Leave request submitted successfully!');
      fetchLeaveRequests(employeeData.employeeId); // Refresh leave requests list
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setLeaveStatus('An error occurred. Please try again.');
    }

    setLeaveRequest({
      startDate: '',
      endDate: '',
      leaveType: '',
      reason: '',
      additionalInfo: '',
    });

    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setLeaveStatus(null);
  };

  return (
    <div className='leave-request-container'>
      <button onClick={openModal} className='toggle-button'>
        Request Leave
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <h1 className='title'>Leave Request</h1>
        <form className='leave-request-form' onSubmit={handleSubmit}>
          <div className='form-field'>
            <label>Employee Name:</label>
            <input type='text' value={employeeData?.employeeName || ''} readOnly />
          </div>
          <div className='form-field'>
            <label>Employee ID:</label>
            <input type='text' value={employeeData?.employeeId || ''} readOnly />
          </div>
          <div className='form-field'>
            <label>Leave Type:</label>
            <select name='leaveType' value={leaveRequest.leaveType} onChange={handleChange} required>
              <option value=''>Select Leave Type</option>
              <option value='Sick Leave'>Sick Leave</option>
              <option value='Casual Leave'>Casual Leave</option>
              <option value='Annual Leave'>Annual Leave</option>
            </select>
          </div>
          <div className='form-field'>
            <label>Start Date:</label>
            <input type='date' name='startDate' value={leaveRequest.startDate} onChange={handleChange} required />
          </div>
          <div className='form-field'>
            <label>End Date:</label>
            <input type='date' name='endDate' value={leaveRequest.endDate} onChange={handleChange} required />
          </div>
          <div className='form-field'>
            <label>Reason:</label>
            <textarea name='reason' value={leaveRequest.reason} onChange={handleChange} required />
          </div>
          <div className='form-field'>
            <label>Additional Info:</label>
            <textarea name='additionalInfo' value={leaveRequest.additionalInfo} onChange={handleChange} />
          </div>
          <button type='submit' className='submit-button'>Submit Request</button>
          {leaveStatus && <div className='leave-status'>{leaveStatus}</div>}
        </form>
      </Modal>

      {/* List of Leave Requests */}
      <h2>My Leave Requests</h2>
      {leaveRequests.length > 0 ? (
        <table className='leave-table'>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveRequest;
