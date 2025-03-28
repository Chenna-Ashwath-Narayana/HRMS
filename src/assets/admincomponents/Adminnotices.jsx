import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import "../Admincomponentsstyles/AdminNotices.css";

const AdminNotice = () => {
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    noticeTitle: "",
    noticeDetails: "",
    date: "",
    department: "",
    isImportant: false,
  });
  const [editingNotice, setEditingNotice] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showNoticeList, setShowNoticeList] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:9000/notice/listNotices");
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddNotice = async () => {
    try {
      const noticeData = {
        noticeTitle: formData.noticeTitle || "",
        noticeDetails: formData.noticeDetails || "",
        date: formData.date,
        department: formData.department || "",
        isImportant: !!formData.isImportant,
      };

      // ✅ Log data before sending
      // console.log("📤 Sending Notice Data:", noticeData); 

      const response = await axios.post("http://localhost:9000/notice/add", noticeData, {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Log response from backend
      // console.log("✅ Response from server:", response.data); 

      setNotices([...notices, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  const handleEditNotice = (notice) => {
    setFormData({
      noticeTitle: notice.noticeTitle,
      noticeDetails: notice.noticeDetails,
      date: notice.date,
      department: notice.department,
      isImportant: !!notice.isImportant,
    });
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleUpdateNotice = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/notice/updateNotice/${editingNotice.noticeId}`,
        formData
      );
      const updatedNotices = notices.map((notice) =>
        notice.noticeId === editingNotice.noticeId ? response.data : notice
      );
      setNotices(updatedNotices);
      resetForm();
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    try {
      await axios.delete(`http://localhost:9000/notice/delete/${noticeId}`);
      setNotices(notices.filter((notice) => notice.noticeId !== noticeId));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      noticeTitle: "",
      noticeDetails: "",
      date: "",
      department: "",
      isImportant: false,
    });
    setEditingNotice(null);
    setShowForm(false);
  };

  // ✅ FIXED: Ensuring noticeTitle is always a string
  const filteredNotices = notices.filter((notice) =>
    (notice.noticeTitle ? notice.noticeTitle.toLowerCase() : "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-notice-container">
      {/* Heading */}
      <div className="notice-header">
        <h1>Notice Management</h1>
      </div>

      {/* Controls Section */}
      <div className="notice-controls">
        <motion.button className="add-notice-button" onClick={() => setShowForm(true)} whileHover={{ scale: 1.1 }}>
          Add New Notice
        </motion.button>
        <input
          type="text"
          className="notice-search"
          placeholder="Search Notices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Notice List */}
      <div className="notice-list-section">
        {filteredNotices.map((notice) => (
          <motion.div key={notice.noticeId} className="notice-item" whileHover={{ scale: 1.05 }}>
            <h3>{notice.noticeTitle}</h3>
            <p>{notice.noticeDetails}</p>
            <p><strong>📅 Date:</strong> {new Date(notice.date).toLocaleDateString()}</p>
            <p>{notice.department}</p>
            <p><strong>⚠️ Important:</strong>{notice.isImportant ? "Important" : "Regular"}</p>
            <div className="notice-actions">
              <FaEdit onClick={() => handleEditNotice(notice)} className="notice-action-icon" />
              <FaTrash onClick={() => handleDeleteNotice(notice.noticeId)} className="notice-action-icon" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notice Form Popup */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <h2>{editingNotice ? "Edit Notice" : "Add New Notice"}</h2>
          <form className="centered-form">
            <input type="text" name="noticeTitle" value={formData.noticeTitle} onChange={handleInputChange} placeholder="Notice Title" />
            <textarea name="noticeDetails" value={formData.noticeDetails} onChange={handleInputChange} placeholder="Notice Details" />
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            <input type="text" name="department" value={formData.department} onChange={handleInputChange} placeholder="Department" />
            <label>
              Important: <input type="checkbox" name="isImportant" checked={formData.isImportant} onChange={handleInputChange} />
            </label>
            <motion.button type="button" onClick={editingNotice ? handleUpdateNotice : handleAddNotice} whileHover={{ scale: 1.05 }}>
              {editingNotice ? "Update Notice" : "Add Notice"}
            </motion.button>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => (
  <div className="modal-overlay">
    <motion.div className="modal-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <span className="close" onClick={onClose}>
        &times;
      </span>
      {children}
    </motion.div>
  </div>
);

export default AdminNotice;
