import React from 'react';

const Home = () => {
  return (
    <div style={{
      padding: '3rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f0f4ff, #e6f7ff)',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#0d6efd', marginBottom: '1rem' }}>Welcome to MyNoteApp 📝</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>
        Create, view, and manage your personal notes securely and efficiently.
      </p>
      <p style={{ fontSize: '1rem', color: '#777', marginTop: '2rem' }}>
        Click on "Add Note" to start or view your saved notes.
      </p>
    </div>
  );
};

export default Home;
