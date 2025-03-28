import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../Admincomponentsstyles/AdminCalendar.css'; // Create a CSS file for custom styles

const Admincalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:9000/event/listEvents');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle date selection in the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, date: date.toISOString().split('T')[0] });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new event
  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:9000/event/addEvent', formData);
      setEvents([...events, response.data]); // Add new event to the list
      resetForm();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Edit an existing event
  const handleEditEvent = (event) => {
    setFormData({
      eventName: event.eventName,
      description: event.description,
      date: event.date,
    });
    setEditingEvent(event);
    setShowForm(true);
  };

  // Update the event
  const handleUpdateEvent = async () => {
    try {
      const response = await axios.put(`http://localhost:9000/event/updateEvent/${editingEvent.eventId}`, formData);
      const updatedEvents = events.map((event) =>
        event.eventId === editingEvent.eventId ? response.data : event
      );
      setEvents(updatedEvents); // Update the list of events
      resetForm();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9000/event/deleteEvent/${eventId}`);
      setEvents(events.filter((event) => event.eventId !== eventId)); // Remove event from the list
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Reset the form after adding/editing an event
  const resetForm = () => {
    setFormData({
      eventName: '',
      description: '',
      date: '',
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  return (
    <div className="admin-calendar">
      <h1 className='admincalendar-heading-container'>Admin Calendar</h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </motion.div>

      <motion.button
        className="event-form-toggle"
        onClick={() => setShowForm(!showForm)}
        whileHover={{ scale: 1.1 }}
      >
        {showForm ? 'Hide Form' : 'Add New Event'}
      </motion.button>

      {showForm && (
        <motion.div
          className="event-form"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
          <form>
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
            <motion.button
              type="button"
              onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
              whileHover={{ scale: 1.05 }}
            >
              {editingEvent ? 'Update Event' : 'Add Event'}
            </motion.button>
          </form>
        </motion.div>
      )}

      <div className="event-list">
        <h2>Event List</h2>
        <EventList events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
      </div>
    </div>
  );
};

// Event list component to display the list of events
const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <motion.div className="event-list-container">
      {events.map((event) => (
        <motion.div key={event.eventId} className="event-item" whileHover={{ scale: 1.05 }}>
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

export default Admincalendar;
