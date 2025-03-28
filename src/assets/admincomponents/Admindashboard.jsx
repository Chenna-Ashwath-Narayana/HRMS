import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Admincomponentsstyles/Admindashboard.css";

const Admindashboard = () => {
  const [employeecount, setCount] = useState(0);
  const [projectscount, setProjectsCount] = useState(0);
  const [clientscount, setClientsCount] = useState(0);
  const [latestNotice, setLatestNotice] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Employee Count
  useEffect(() => {
    axios
      .get("http://localhost:9000/employee/count")
      .then((response) => setCount(response.data))
      .catch((error) => console.error("Error fetching employee count:", error));
  }, []);

  // ✅ Fetch Project Count
  useEffect(() => {
    axios
      .get("http://localhost:9000/project/count")
      .then((response) => setProjectsCount(response.data))
      .catch((error) => console.error("Error fetching project count:", error));
  }, []);

  // ✅ Fetch Client Count
  useEffect(() => {
    axios
      .get("http://localhost:9000/client/count")
      .then((response) => setClientsCount(response.data))
      .catch((error) => console.error("Error fetching client count:", error));
  }, []);

  // ✅ Fetch Latest Notice
  useEffect(() => {
    fetch("http://localhost:9000/notice/latest")
      .then((response) => response.json())
      .then((data) => setLatestNotice(data))
      .catch((error) => console.error("Error fetching notice:", error));
  }, []);

  // ✅ Fetch Employees
  useEffect(() => {
    axios
      .get("http://localhost:9000/employee/listEmployee")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, []);

  // ✅ Fetch Clients
  useEffect(() => {
    axios
      .get("http://localhost:9000/client/listClients")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  // ✅ Show loading message before data is fetched
  if (loading) return <div className="employee-loading">Loading...</div>;

  return (
    <>
      <div className="dashboardpage-container">
        {/* Employee, Project, and Client Counts */}
        <div className="count-of-all">
          <div className="employeecount-container">
            <h2>Employee Count:</h2>
            <p><strong>{employeecount}</strong></p>
          </div>
          <div className="projectcount-container">
            <h2>No of Projects:</h2>
            <p><strong>{projectscount}</strong></p>
          </div>
          <div className="clientcount-container">
            <h2>No Of Clients:</h2>
            <p><strong>{clientscount}</strong></p>
          </div>
        </div>

              {/* Latest Notice */}
              <div className="second-page-container">
              {latestNotice ? (
        <div className="notice-box">
          <h3>{latestNotice.noticeTitle}</h3>
          <p><strong>Department:</strong> {latestNotice.department}</p>
          <p><strong>Date:</strong> {new Date(latestNotice.noticeDate).toLocaleDateString()}</p>
          <p><strong>Details:</strong> {latestNotice.noticeDetails}</p>
          <small><strong>Created At:</strong> {new Date(latestNotice.createdAt).toLocaleString()}</small>
        </div>
      ) : (
        <p>No latest notices available.</p>
      )}


          {/* Employee List */}
          <div className="employeelist-container">
            <div className="employee-list-container">
              <h2>Employee List</h2>
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.employeeId}>
                      <td>{emp.employeeId}</td>
                      <td>{emp.employeeName}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

              {/* Client List */}
      <div className="client-list-container">
        <h2>Client List</h2>
        <div className="client-table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Company Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.clientId}>
                  <td>{client.clientId}</td>
                  <td>{client.clientName}</td>
                  <td>{client.companyName}</td>
                  <td>{client.contactPerson}</td>
                  <td>{client.email}</td>
                  <td>{client.phoneNumber}</td>
                  <td>{client.address}</td>
                  <td>{client.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      </div>
    </>
  );
};

export default Admindashboard;
