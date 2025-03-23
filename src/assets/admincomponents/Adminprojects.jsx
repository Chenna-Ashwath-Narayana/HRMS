import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icons for edit and delete
import '../Admincomponentsstyles/Adminprojects.css';

const Adminprojects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ projectName: '', description: '', status: '', budget: '', projectDuration: '', fullDetails: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false); // Modal for adding project
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal for updating project
  const [selectedProject, setSelectedProject] = useState(null); // Selected project for updating

  const projectsPerPage = 6;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get('http://localhost:9000/project/listProjects')
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  };

  const handleAddProject = () => {
    axios
      .post('http://localhost:9000/project/addProject', newProject)
      .then((response) => {
        setProjects([...projects, response.data]);
        setNewProject({ projectName: '', description: '', status: '', budget: '', projectDuration: '', fullDetails: '' });
        alert('Project added successfully');
        setShowAddModal(false);
      })
      .catch((error) => {
        console.error('Error adding project:', error);
      });
  };

  const handleUpdateProject = () => {
    axios
      .put(`http://localhost:9000/project/updateProject/${selectedProject.projectId}`, selectedProject)
      .then((response) => {
        const updatedProjects = projects.map((project) =>
          project.projectId === selectedProject.projectId ? response.data : project
        );
        setProjects(updatedProjects);
        alert('Project updated successfully');
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios
        .delete(`http://localhost:9000/project/deleteProject/${projectId}`)
        .then(() => {
          setProjects(projects.filter((project) => project.projectId !== projectId));
          alert('Project deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting project:', error);
        });
    }
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true); // Show update modal
  };

  const startIndex = currentPage * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

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
    <div className="admin-projects-container">
      {/* First Section: Heading */}
      <div className="header">
        <h2>Admin Projects</h2>
        <button onClick={() => setShowAddModal(true)} className="add-project-button">
          Add New Project
        </button>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h3>Add New Project</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
              <div>
                <label>Project Name:</label>
                <input
                  type="text"
                  value={newProject.projectName}
                  onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <input
                  type="text"
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Budget:</label>
                <input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Project Duration (Days):</label>
                <input
                  type="number"
                  value={newProject.projectDuration}
                  onChange={(e) => setNewProject({ ...newProject, projectDuration: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Full Details:</label>
                <textarea
                  value={newProject.fullDetails}
                  onChange={(e) => setNewProject({ ...newProject, fullDetails: e.target.value })}
                  required
                />
              </div>
              <div>
                <button type="submit">Add Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Project Modal */}
      {showUpdateModal && selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <h3>Update Project</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateProject(); }}>
              <div>
                <label>Project Name:</label>
                <input
                  type="text"
                  value={selectedProject.projectName}
                  onChange={(e) => setSelectedProject({ ...selectedProject, projectName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={selectedProject.description}
                  onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <input
                  type="text"
                  value={selectedProject.status}
                  onChange={(e) => setSelectedProject({ ...selectedProject, status: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Budget:</label>
                <input
                  type="number"
                  value={selectedProject.budget}
                  onChange={(e) => setSelectedProject({ ...selectedProject, budget: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Project Duration (Days):</label>
                <input
                  type="number"
                  value={selectedProject.projectDuration}
                  onChange={(e) => setSelectedProject({ ...selectedProject, projectDuration: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Full Details:</label>
                <textarea
                  value={selectedProject.fullDetails}
                  onChange={(e) => setSelectedProject({ ...selectedProject, fullDetails: e.target.value })}
                  required
                />
              </div>
              <div>
                <button type="submit">Update Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Display Section */}
      <div className="projects-display-section">
        {currentProjects.map((project) => (
          <div className="project-card" key={project.projectId}>
            <h3><strong>Project Name: <br /></strong>{project.projectName}</h3>
            <p><strong>Project Description: <br /></strong>{project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Budget:</strong> {project.budget}</p>
            <p><strong>Project Duration:</strong> {project.projectDuration} days</p>
            <p><strong>Full Details:</strong> {project.fullDetails}</p>
            <div className="project-actions">
              <FaEdit className="edit-icon" onClick={() => handleEditClick(project)} />
              <FaTrashAlt className="delete-icon" onClick={() => handleDeleteProject(project.projectId)} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Adminprojects;
