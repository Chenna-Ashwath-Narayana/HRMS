import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../Admincomponentsstyles/Adminclients.css'; // Importing CSS for styling

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: '',
    status: ''
  });
  const [editingClientId, setEditingClientId] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to show/hide popup
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const clientsPerPage = 6; // Number of clients per page

  // Fetch clients when the component loads
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios
      .get('http://localhost:9000/client/listClients')
      .then((response) => setClients(response.data))
      .catch((error) => console.error('Error fetching clients:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClientId) {
      axios
        .put(`http://localhost:9000/client/updateClient/${editingClientId}`, formData)
        .then(() => {
          fetchClients(); // Reload clients after update
          setEditingClientId(null); // Reset form
          setFormData({ clientId: '', clientName: '', companyName: '', contactPerson: '', email: '', phoneNumber: '', address: '', status: '' });
          setShowPopup(false); // Close popup
        })
        .catch((error) => console.error('Error updating client:', error));
    } else {
      axios
        .post('http://localhost:9000/client/addClient', formData)
        .then(() => {
          fetchClients(); // Reload clients after add
          setFormData({ clientId: '', clientName: '', companyName: '', contactPerson: '', email: '', phoneNumber: '', address: '', status: '' });
          setShowPopup(false); // Close popup
        })
        .catch((error) => console.error('Error adding client:', error));
    }
  };

  const handleEdit = (client) => {
    setEditingClientId(client.clientId);
    setFormData({
      clientId: client.clientId,
      clientName: client.clientName,
      companyName: client.companyName,
      contactPerson: client.contactPerson,
      email: client.email,
      phoneNumber: client.phoneNumber,
      address: client.address,
      status: client.status
    });
    setShowPopup(true); // Show popup when editing
  };

  const handleDelete = (clientId) => {
    axios
      .delete(`http://localhost:9000/client/deleteClient/${clientId}`)
      .then(() => fetchClients()) // Reload clients after delete
      .catch((error) => console.error('Error deleting client:', error));
  };

  // Handle pagination page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Calculate the current clients to display per page
  const offset = currentPage * clientsPerPage;
  const currentClients = clients.slice(offset, offset + clientsPerPage);

  return (
    <div className="admin-clients">
      <h1>Client Management</h1>
      <button className="add-client-btn" onClick={() => setShowPopup(true)}>Add Client</button>

      {/* Popup form */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Contact Person"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select> <br />
              <button type="submit">{editingClientId ? 'Update Client' : 'Add Client'}</button>
              <button type="button" onClick={() => setShowPopup(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

              {/* Client list */ }
        <div className="client-grid">
          {currentClients.map((client) => (
            <div key={client.clientId} className="client-card">
              <div className="client-card-content">
                <h3>{client.clientName}</h3>
                <div className="client-details">
                  <p><strong>Company Name:</strong> {client.companyName}</p>
                  <p><strong>Contact Person:</strong> {client.contactPerson}</p>
                  <p><strong>Email:</strong> {client.email}</p>
                  <p><strong>Phone Number:</strong> {client.phoneNumber}</p>
                  <p><strong>Address:</strong> {client.address}</p>
                  <p><strong>Status:</strong> {client.status}</p>
                </div>
              </div>
              <div className="client-card-actions">
                <button onClick={() => handleEdit(client)}>Edit</button>
                <button onClick={() => handleDelete(client.clientId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>


      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'} 
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(clients.length / clientsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default AdminClients;
