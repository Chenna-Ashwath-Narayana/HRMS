import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../Admincomponentsstyles/AdminEvents.css';

const Adminevents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
    image: null,
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEventList, setShowEventList] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:9000/event/listEvents');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleAddEvent = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('eventName', formData.eventName);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:9000/event/addEvent', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEvents([...events, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEditEvent = (event) => {
    setFormData({
      eventName: event.eventName,
      description: event.description,
      date: event.date,
      image: null,
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleUpdateEvent = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('eventName', formData.eventName);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:9000/event/updateEvent/${editingEvent.eventId}`,
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const updatedEvents = events.map((event) =>
        event.eventId === editingEvent.eventId ? response.data : event
      );
      setEvents(updatedEvents);
      resetForm();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9000/event/deleteEvent/${eventId}`);
      setEvents(events.filter((event) => event.eventId !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      eventName: '',
      description: '',
      date: '',
      image: null,
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  return (
    <div className="admin-events">
      <h1>Event Management</h1>

      {/* Button to toggle the form popup */}
      <motion.button
        className="event-form-toggle"
        onClick={() => setShowForm(true)}
        whileHover={{ scale: 1.1 }}
      >
        Add New Event
      </motion.button>

      {/* Modal for Event Form */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
          <form className="centered-form">
            <div>
              <label>Event Name</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Image</label>
              <input type="file" name="image" onChange={handleFileChange} />
            </div>
            <motion.button
              type="button"
              onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
              whileHover={{ scale: 1.05 }}
            >
              {editingEvent ? 'Update Event' : 'Add Event'}
            </motion.button>
          </form>
        </Modal>
      )}

      {/* Button to toggle the event list popup */}
      <motion.button
        className="show-event-list-btn"
        onClick={() => setShowEventList(true)}
        whileHover={{ scale: 1.1 }}
      >
        Show Event List
      </motion.button>

      {/* Modal for Event List */}
      {showEventList && (
        <Modal onClose={() => setShowEventList(false)}>
          <h2>Event List</h2>
          <div className="event-list-content">
            <EventList events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
          </div>
        </Modal>
      )}
    </div>
  );
};

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <motion.div className="event-list">
      {events.map((event) => (
        <motion.div key={event.eventId} className="event-item" whileHover={{ scale: 1.05 }}>
          <img src={`http://localhost:9000/uploads/${event.image}`} alt={event.eventName} />
          <h3>{event.eventName}</h3>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
          <div className="event-actions">
            <FaEdit onClick={() => onEdit(event)} className="event-action-icon" />
            <FaTrash onClick={() => onDelete(event.eventId)} className="event-action-icon" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <motion.div className="modal-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </motion.div>
    </div>
  );
};

export default Adminevents;