// EventForm.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EventForm = ({ onSubmit, event = {}, editing }) => {
  const [formData, setFormData] = useState({
    eventName: event.eventName || '',
    description: event.description || '',
    date: event.date || '',
    image: event.image || null,
  });

  useEffect(() => {
    setFormData({
      eventName: event.eventName || '',
      description: event.description || '',
      date: event.date || '',
      image: event.image || null,
    });
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('eventName', formData.eventName);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('image', formData.image);

    onSubmit(data);
    setFormData({
      eventName: '',
      description: '',
      date: '',
      image: null,
    });
  };

  return (
    <motion.form className="event-form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>{editing ? 'Edit Event' : 'Add Event'}</h2>
      <input
        type="text"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        placeholder="Event Name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
      />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="file" name="image" onChange={handleImageChange} />

      <button type="submit">{editing ? 'Update Event' : 'Add Event'}</button>
    </motion.form>
  );
};

export default EventForm;
