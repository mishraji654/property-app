import React, { useState } from 'react';
import api from '../api';

export default function AddPropertyForm({ onAdded }) {
  const [form, setForm] = useState({
    name: '', type: 'Residential', price: '', location: '', description: '', image: '', lat: '', lng: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.price || !form.location) return alert('Fill name, price, location');
    const payload = {
      ...form,
      price: Number(form.price),
      lat: form.lat ? Number(form.lat) : undefined,
      lng: form.lng ? Number(form.lng) : undefined
    };
    try {
      setSubmitting(true);
      await api.post('/properties', payload);
      alert('Property added');
      setForm({ name: '', type: 'Residential', price: '', location: '', description: '', image: '', lat: '', lng: '' });
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      alert('Error adding property');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add Property</h3>
      <div className="row">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <select name="type" value={form.type} onChange={handleChange}>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Plot</option>
        </select>
      </div>
      <div className="row">
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      </div>
      <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <div className="row">
        <input name="lat" placeholder="Latitude (optional)" value={form.lat} onChange={handleChange} />
        <input name="lng" placeholder="Longitude (optional)" value={form.lng} onChange={handleChange} />
      </div>
      <button type="submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add Property'}</button>
    </form>
  );
}
