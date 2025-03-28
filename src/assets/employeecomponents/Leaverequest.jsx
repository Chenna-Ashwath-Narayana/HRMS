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
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employeeData'));
    if (!data) {
      navigate('/adminlogin');
    } else {
      setEmployeeData(data);
      fetchLeaveRequests(data.employeeId);
    }
  }, [navigate]);

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
      await axios.post('http://localhost:9000/leaves/saveleaves', {
        employeeId: employeeData.employeeId,
        employeeName: employeeData.employeeName,
        ...leaveRequest,
      });

      setLeaveStatus('Leave request submitted successfully!');
      fetchLeaveRequests(employeeData.employeeId);
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
    <div className="leaveRequest-container">
      <button onClick={openModal} className="leaveRequest-btn">
        Request Leave
      </button>

        <Modal isOpen={isOpen} onClose={closeModal}>
          <h1 className="leaveRequest-title">Leave Request</h1>

          <div className="leaveRequest-formWrapper">
            <form className="leaveRequest-form" onSubmit={handleSubmit}>
              
              <div className="leaveRequest-field">
                <label className="leaveRequest-label">Employee Name:</label>
                <input type="text" value={employeeData?.employeeName || ''} readOnly className="leaveRequest-input" />
              </div>

              <div className="leaveRequest-field">
                <label className="leaveRequest-label">Employee ID:</label>
                <input type="text" value={employeeData?.employeeId || ''} readOnly className="leaveRequest-input" />
              </div>

              <div className="leaveRequest-field">
                <label className="leaveRequest-label">Leave Type:</label>
                <select name="leaveType" value={leaveRequest.leaveType} onChange={handleChange} required className="leaveRequest-input">
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                </select>
              </div>

              <div className="leaveRequest-field">
                <label className="leaveRequest-label">Start Date:</label>
                <input type="date" name="startDate" value={leaveRequest.startDate} onChange={handleChange} required className="leaveRequest-input" />
              </div>

              <div className="leaveRequest-field">
                <label className="leaveRequest-label">End Date:</label>
                <input type="date" name="endDate" value={leaveRequest.endDate} onChange={handleChange} required className="leaveRequest-input" />
              </div>

              <div className="leaveRequest-field">
                <label className="leaveRequest-label">Reason:</label>
                <textarea name="reason" value={leaveRequest.reason} onChange={handleChange} required className="leaveRequest-textarea"></textarea>
              </div>

              <div className="leaveRequest-field">
                <label className="leaveRequest-label">Additional Info:</label>
                <textarea name="additionalInfo" value={leaveRequest.additionalInfo} onChange={handleChange} className="leaveRequest-textarea"></textarea>
              </div>

              <button type="submit" className="leaveRequest-submitBtn">Submit Request</button>
              {leaveStatus && <div className="leaveRequest-status">{leaveStatus}</div>}
              
            </form>
          </div>
        </Modal>


      {/* List of Leave Requests */}
      <h2 className="leaveRequest-listTitle">My Leave Requests</h2>
      {leaveRequests.length > 0 ? (
        <table className="leaveRequest-table">
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
        <p className="leaveRequest-noRequests">No leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveRequest;
