import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../employeecomponentsstyles/PayrollDetails.css';

const PayrollDetails = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const employeeData = JSON.parse(localStorage.getItem('employeeData'));
    if (employeeData) {
      fetchPayrollDetails(employeeData.employeeId);
    }
  }, []);

  const fetchPayrollDetails = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:9000/payroll/employee/${employeeId}`);
      setPayrollData(response.data);
    } catch (error) {
      console.error('Error fetching payroll data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-payroll-container">
      <h1 className='payrolldetails-container'>Payroll Details</h1>
      {loading ? (
        <p>Loading payroll data...</p>
      ) : payrollData.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Salary Paid</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((record, index) => (
              <tr key={index}>
                <td>{record.month}</td>
                <td>{record.year}</td>
                <td>{record.salaryPaid}</td>
                <td>{record.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PayrollDetails;
