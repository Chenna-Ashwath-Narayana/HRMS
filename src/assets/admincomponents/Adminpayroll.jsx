import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Admincomponentsstyles/AdminPayroll.css";

const EmployeePayroll = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:9000/employee/listEmployee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handlePaySalary = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !month || !year) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:9000/payroll/create", null, {
        params: {
          employeeId: parseInt(selectedEmployee),
          month,
          year: parseInt(year, 10),
        },
      });
      alert("Salary paid successfully!");
    } catch (error) {
      console.error("Error paying salary:", error);
      alert("Error occurred while processing the payment!");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentHistory = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:9000/payroll/history/${employeeId}`);
      setPaymentHistory(response.data);
      setShowHistoryModal(true);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  return (
    <div className="payroll-container">
      {/* First Section: Heading */}
      <div className="header-section">
        <h1>Employee Payroll Management</h1>
      </div>

      {/* Second Section: Salary Payment Form */}
      <div className="salary-form-section">
        <h2>Pay Employee Salaries</h2>
        <form onSubmit={handlePaySalary} className="salary-form">
          <div className="form-group">
            <label>Select Employee:</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.employeeId} - Salary: {employee.salary}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Month:</label>
            <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Year:</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
          </div>

          <button type="submit" className="pay-button" disabled={loading}>
            {loading ? "Processing..." : "Pay Salary"}
          </button>
        </form>
      </div>

      {/* Third Section: Employee List - Scrollable */}
      <div className="employee-list-section">
        <h2>Employee List</h2>
        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.employeeName}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button className="view-history-button" onClick={() => fetchPaymentHistory(employee.employeeId)}>
                      View Payment History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History Modal */}
      {showHistoryModal && (
        <div className="modal-overlay">
          <div className="modal-content-container">
            <h2>Payment History</h2>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Amount Paid</th>
                  <th>Date Paid</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{history.month}</td>
                    <td>{history.year}</td>
                    <td>{history.salaryPaid}</td>
                    <td>{history.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="close-modal-button" onClick={() => setShowHistoryModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePayroll;
