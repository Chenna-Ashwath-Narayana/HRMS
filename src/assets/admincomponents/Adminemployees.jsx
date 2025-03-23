import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admincomponentsstyles/Adminemployees.css';

const Adminemployees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ 
    employeeId: '', 
    employeeName: '', 
    designation: '', 
    department: '', 
    salary: '', 
    mobile: '', // New field
    email: '', // New field
    joinDate: '', // New field
    address: '' // New field
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false); // Modal for adding employee
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal for employee details
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal for updating employee
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for details

  const employeesPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get('http://localhost:9000/employee/listEmployee')
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  };

  const handleAddEmployee = () => {
    axios
      .post('http://localhost:9000/employee/addemployee', newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setNewEmployee({ 
          employeeId: '', 
          employeeName: '', 
          designation: '', 
          department: '', 
          salary: '', 
          mobile: '', 
          email: '', 
          joinDate: '', 
          address: ''
        });
        alert('Employee added successfully');
        setShowAddModal(false);
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  };

  const handleUpdateEmployee = () => {
    axios
      .put(`http://localhost:9000/employee/updateEmployee/${selectedEmployee.employeeId}`, selectedEmployee)
      .then((response) => {
        const updatedEmployees = employees.map((employee) =>
          employee.employeeId === selectedEmployee.employeeId ? response.data : employee
        );
        setEmployees(updatedEmployees);
        alert('Employee updated successfully');
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
      });
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios
        .delete(`http://localhost:9000/employee/deleteEmployee/${employeeId}`)
        .then(() => {
          setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
          alert('Employee deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true); // Show employee details modal
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true); // Show update modal
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = currentPage * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-employees-container">
      <div className="header">
        <h2>Employee Management System</h2>
      </div>

      <div className="add-employee-button">
        <button onClick={() => setShowAddModal(true)}>Add New Employee</button>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h3>Add New Employee</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddEmployee(); }}>
              <div>
                <label>Employee Id:</label>
                <input
                  type="number"
                  value={newEmployee.employeeId}
                  onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Employee Name:</label>
                <input
                  type="text"
                  value={newEmployee.employeeName}
                  onChange={(e) => setNewEmployee({ ...newEmployee, employeeName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Designation:</label>
                <input
                  type="text"
                  value={newEmployee.designation}
                  onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Department:</label>
                <input
                  type="text"
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Employee Salary:</label>
                <input
                  type="number"
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                />
              </div>
              <div>
                <label>Mobile:</label>
                <input
                  type="text"
                  value={newEmployee.mobile}
                  onChange={(e) => setNewEmployee({ ...newEmployee, mobile: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Join Date:</label>
                <input
                  type="date"
                  value={newEmployee.joinDate}
                  onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  value={newEmployee.address}
                  onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <button type="submit">Add Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Details Modal */}
      {showDetailsModal && selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDetailsModal(false)}>&times;</span>
            <h3>Employee Details</h3>
            <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
            <p><strong>Name:</strong> {selectedEmployee.employeeName}</p>
            <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Mobile:</strong> {selectedEmployee.mobile}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Join Date:</strong> {selectedEmployee.joinDate}</p>
            <p><strong>Address:</strong> {selectedEmployee.address}</p>
          </div>
        </div>
      )}

      {/* Update Employee Modal */}
      {showUpdateModal && selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <h3>Update Employee</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateEmployee(); }}>
              <div>
                <label>Employee Name:</label>
                <input
                  type="text"
                  value={selectedEmployee.employeeName}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, employeeName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Designation:</label>
                <input
                  type="text"
                  value={selectedEmployee.designation}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, designation: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Department:</label>
                <input
                  type="text"
                  value={selectedEmployee.department}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Mobile:</label>
                <input
                  type="text"
                  value={selectedEmployee.mobile}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, mobile: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={selectedEmployee.email}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Join Date:</label>
                <input
                  type="date"
                  value={selectedEmployee.joinDate}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, joinDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  value={selectedEmployee.address}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <button type="submit">Update Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="employee-list-section">
        <input
          type="text"
          placeholder="Search by employee name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
            {currentEmployees.map((employee) => (
              <tr key={employee.employeeId}>
                <td onClick={() => handleEmployeeClick(employee)}>{employee.employeeId}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.designation}</td>
                <td>{employee.department}</td>
                <td>
                  <button className='editbutton' onClick={() => handleEditClick(employee)}>Edit</button>
                  <button className='deletebutton' onClick={() => handleDeleteEmployee(employee.employeeId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Adminemployees;