import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admincomponentsstyles/AdminEmployees.css';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    employeeId: '', employeeName: '', designation: '', department: '', salary: '', 
    mobile: '', email: '', joinDate: '', address: ''
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const employeesPerPage = 8;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:9000/employee/listEmployee')
      .then(response => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      // Update Employee
      axios.put(`http://localhost:9000/employee/updateEmployee/${selectedEmployee.employeeId}`, employeeData)
        .then(response => {
          setEmployees(employees.map(emp => emp.employeeId === selectedEmployee.employeeId ? response.data : emp));
          alert('Employee updated successfully');
          closeModal();
        })
        .catch(error => console.error('Error updating employee:', error));
    } else {
      // Add Employee
      axios.post('http://localhost:9000/employee/addemployee', employeeData)
        .then(response => {
          setEmployees([...employees, response.data]);
          alert('Employee added successfully');
          closeModal();
        })
        .catch(error => console.error('Error adding employee:', error));
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:9000/employee/deleteEmployee/${employeeId}`)
        .then(() => {
          setEmployees(employees.filter(emp => emp.employeeId !== employeeId));
          alert('Employee deleted successfully');
        })
        .catch(error => console.error('Error deleting employee:', error));
    }
  };

  const openModal = (employee = null) => {
    if (employee) {
      setSelectedEmployee(employee);
      setEmployeeData(employee);
    } else {
      setSelectedEmployee(null);
      setEmployeeData({
        employeeId: '', employeeName: '', designation: '', department: '', salary: '', 
        mobile: '', email: '', joinDate: '', address: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setEmployeeData({
      employeeId: '', employeeName: '', designation: '', department: '', salary: '', 
      mobile: '', email: '', joinDate: '', address: ''
    });
  };

  const filteredEmployees = employees.filter(emp =>
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  if (loading) return <div className="employee-loading">Loading...</div>;

  return (
    <div className="employee-container">
      
      {/* Heading */}
      <div className="employee-header">
        <h2>Employee Management System</h2>
      </div>

      {/* Controls */}
      <div className="employee-controls">
        <input
          type="text"
          className="employee-search"
          placeholder="Search by employee name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="employee-add-button" onClick={() => openModal()}>Add Employee</button>
      </div>

      {/* Employee List */}
      <div className="employee-list">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.employeeId}>
                <td>{emp.employeeId}</td>
                <td>{emp.employeeName}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>
                  <button className="employee-edit" onClick={() => openModal(emp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg>
                  </button>
                  <button className="employee-delete" onClick={() => handleDeleteEmployee(emp.employeeId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="employee-pagination">
          <button onClick={handlePrevious} disabled={currentPage === 0}>Previous</button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>Next</button>
        </div>
      </div>

      {/* Modal for Add/Update */}
      {showModal && (
        <div className="employee-modal">
          <div className="employee-modal-content">
            <h3>{selectedEmployee ? 'Update Employee' : 'Add New Employee'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="number" placeholder="Employee ID" value={employeeData.employeeId} required
                onChange={(e) => setEmployeeData({ ...employeeData, employeeId: e.target.value })} disabled={!!selectedEmployee}
              />
              <input type="text" placeholder="Employee Name" value={employeeData.employeeName} required
                onChange={(e) => setEmployeeData({ ...employeeData, employeeName: e.target.value })}
              />
              <input type="text" placeholder="Designation" value={employeeData.designation} required
                onChange={(e) => setEmployeeData({ ...employeeData, designation: e.target.value })}
              />
              <input type="text" placeholder="Department" value={employeeData.department} required
                onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
              />
              <input type="number" placeholder="Salary" value={employeeData.salary} required
                onChange={(e) => setEmployeeData({ ...employeeData, salary: e.target.value })}
              />
              <input type="text" placeholder="Mobile" value={employeeData.mobile} required
                onChange={(e) => setEmployeeData({ ...employeeData, mobile: e.target.value })}
              />
              <input type="email" placeholder="Email" value={employeeData.email} required
                onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
              />
              <input type="date" value={employeeData.joinDate} required
                onChange={(e) => setEmployeeData({ ...employeeData, joinDate: e.target.value })}
              />
              <input type="text" placeholder="Address" value={employeeData.address} required
                onChange={(e) => setEmployeeData({ ...employeeData, address: e.target.value })}
              />
              <button type="submit" className='firstbutton'>{selectedEmployee ? 'Update' : 'Add'} Employee</button>
            </form>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
