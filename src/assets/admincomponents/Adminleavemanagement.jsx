import React, { useEffect, useState } from "react";
import axios from "axios";
import "../admincomponentsstyles/AdminLeaveApproval.css";

const Adminleavemanagemnet = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get("http://localhost:9000/leaves");
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      setError("Failed to fetch leave requests.");
    }
  };

  const updateLeaveStatus = async (employeeId, status) => {
    try {
      await axios.put(`http://localhost:9000/leaves/updateLeave/${employeeId}`, { status });
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.employeeId === employeeId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
      setError("Failed to update leave status.");
    }
  };

  // Sort leave requests: Pending at the top, Approved/Rejected below
  const sortedLeaveRequests = [...leaveRequests].sort((a, b) => {
    if (a.status === "Pending" && (b.status === "Approved" || b.status === "Rejected")) return -1;
    if ((a.status === "Approved" || a.status === "Rejected") && b.status === "Pending") return 1;
    return 0;
  });

  // Filter based on search term
  const filteredRequests = sortedLeaveRequests.filter(
    (leave) =>
      leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employeeId.toString().includes(searchTerm)
  );

  return (
    <div className="admin-leave-management">
      {/* First Section: Heading & Search Bar */}
      <div className="header-section">
        <h2>Leave Approval Panel</h2>
        <input
          type="text"
          placeholder="Search by Employee ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Second Section: Leave Requests Table with Scroll Effect */}
      <div className="leave-list-container">
        {error && <p className="error">{error}</p>}
        {filteredRequests.length > 0 ? (
          <table className="leave-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((leave) => (
                <tr key={leave.id} className={leave.status.toLowerCase()}>
                  <td>{leave.employeeId}</td>
                  <td>{leave.employeeName}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                  <td>
                    {leave.status === "Pending" ? (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => updateLeaveStatus(leave.employeeId, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateLeaveStatus(leave.employeeId, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`status ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-requests">No leave requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Adminleavemanagemnet;
