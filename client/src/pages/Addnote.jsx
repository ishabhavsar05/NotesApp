import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASEURL = import.meta.env.VITE_BASEURL;

const Addnote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASEURL + "note/create",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      alert("Note added successfully!");
      setFormData({ title: '', content: '' });
      navigate("/note");
    } catch (error) {
      alert("Error adding note: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '50px auto',
      padding: '25px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd', marginBottom: '20px' }}>Add Note</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px' }}
        />
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="5"
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px' }}
        ></textarea>
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#0d6efd',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>Add Note</button>
      </form>
    </div>
  );
};

export default Addnote;
