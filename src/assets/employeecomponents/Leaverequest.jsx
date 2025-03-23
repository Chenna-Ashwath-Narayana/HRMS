import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaverequest = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const response = await axios.get(`http://localhost:9000/employee/leaves`);
      setLeaves(response.data);
    };
    fetchLeaves();
  }, []);

  const handleApproveLeave = async (leaveId) => {
    await axios.put(`http://localhost:9000/employee/leaves/approve/${leaveId}`);
    alert('Leave approved successfully!');
    // Optionally, refresh the leaves list
  };

  return (
    <div>
      <h2>Leave Approval</h2>
      {leaves.map((leave) => (
        <div key={leave.id}>
          <p>Leave Request: {leave.reason} from {leave.startDate} to {leave.endDate}</p>
          <button onClick={() => handleApproveLeave(leave.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default Leaverequest;