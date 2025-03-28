import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Icons for edit and delete
import "../Admincomponentsstyles/Adminprojects.css";

const Adminprojects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: "",
    description: "",
    status: "",
    budget: "",
    projectDuration: "",
    fullDetails: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsPerPage = 6;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get("http://localhost:9000/project/listProjects")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  };

  const handleAddProject = () => {
    axios
      .post("http://localhost:9000/project/addProject", newProject)
      .then((response) => {
        setProjects([...projects, response.data]);
        setNewProject({
          projectName: "",
          description: "",
          status: "",
          budget: "",
          projectDuration: "",
          fullDetails: "",
        });
        alert("Project added successfully");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error adding project:", error);
      });
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios
        .delete(`http://localhost:9000/project/deleteProject/${projectId}`)
        .then(() => {
          setProjects(projects.filter((project) => project.projectId !== projectId));
          alert("Project deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
        });
    }
  };

  const startIndex = currentPage * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-projects-container">
      {/* First Section: Heading and Button */}
      <div className="header-section">
        <h2>Admin Projects</h2>
        <button onClick={() => setShowModal(true)} className="add-project-button">
          Add New Project
        </button>
      </div>

      {/* Second Section: Projects Display */}
      <div className="projects-grid">
        {currentProjects.map((project) => (
          <div className="project-card" key={project.projectId}>
            <h3>{project.projectName}</h3>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Budget:</strong> ₹{project.budget}</p>
            <p><strong>Duration:</strong> {project.projectDuration} days</p>
            <div className="card-actions">
              <FaEdit className="edit-icon" onClick={() => handleEditClick(project)} />
              <FaTrashAlt className="delete-icon" onClick={() => handleDeleteProject(project.projectId)} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>

      {/* Modal for Adding/Editing Project */}
      {showModal && (
        <div className="adminmodal-overlay">
          <div className="adminmodal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{selectedProject ? "Edit Project" : "Add New Project"}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
              <input type="text" placeholder="Project Name" value={newProject.projectName} onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })} required />
              <input type="text" placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} required />
              <input type="text" placeholder="Status" value={newProject.status} onChange={(e) => setNewProject({ ...newProject, status: e.target.value })} required />
              <input type="number" placeholder="Budget" value={newProject.budget} onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })} required />
              <input type="number" placeholder="Duration (Days)" value={newProject.projectDuration} onChange={(e) => setNewProject({ ...newProject, projectDuration: e.target.value })} required />
              <textarea placeholder="Full Details" value={newProject.fullDetails} onChange={(e) => setNewProject({ ...newProject, fullDetails: e.target.value })} required />
              <button type="submit">Save Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminprojects;
