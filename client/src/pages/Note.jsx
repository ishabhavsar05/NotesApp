import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BASEURL = import.meta.env.VITE_BASEURL;

const Note = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(BASEURL + "note/getall", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("API response:", response.data);
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
      alert("Please login first to view notes.");
      navigate("/login"); // redirect to login if unauthorized
    }
  };

  const deleteNote = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASEURL}note/delete/${_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Note deleted successfully!");
      fetchNotes(); // refresh the list
    } catch (error) {
      console.log("Error deleting note:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [location]);

  return (
    <div style={{
      padding: '2rem',
      background: '#f4f8ff',
      minHeight: '100vh'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.2rem',
        color: '#0d6efd',
        marginBottom: '1.5rem'
      }}>📝 Your Notes</h2>

      {notes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem' }}>
          No notes found. Add your first note!
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {notes.map((note) => (
            <div key={note._id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {note.noteimage && (
                <img
                  src={note.noteimage}
                  alt="Note"
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                  }}
                />
              )}
              <div style={{ padding: '1rem' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>{note.title}</h3>
                <p style={{
                  color: '#555',
                  fontSize: '1rem',
                  lineHeight: '1.4',
                  marginBottom: '1rem'
                }}>{note.content}</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => deleteNote(note._id)}
                    style={{
                      flex: 1,
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      padding: '8px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/update/${note._id}`)}
                    style={{
                      flex: 1,
                      backgroundColor: '#0d6efd',
                      color: '#fff',
                      padding: '8px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
