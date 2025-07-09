import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'black',
      padding: '12px 20px',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>NOTEAPP</h1>
      <ol style={{
        display: 'flex',
        gap: '15px',
        listStyle: 'none',
        margin: 0,
        padding: 0
      }}>
        <li><NavLink to="/" style={{ color: 'white', textDecoration: 'none', padding: '6px 12px', borderRadius: '4px' }}>Home</NavLink></li>
        <li><NavLink to="/note" style={{ color: 'white', textDecoration: 'none', padding: '6px 12px', borderRadius: '4px' }}>Note</NavLink></li>
        <li><NavLink to="/addnote" style={{ color: 'white', textDecoration: 'none', padding: '6px 12px', borderRadius: '4px' }}>Add Note</NavLink></li>
        <li><NavLink to="/login" style={{ color: 'white', textDecoration: 'none', padding: '6px 12px', borderRadius: '4px' }}>Login</NavLink></li>
        <li><NavLink to="/register" style={{ color: 'white', textDecoration: 'none', padding: '6px 12px', borderRadius: '4px' }}>Register</NavLink></li>
      </ol>
    </div>
  );
};

export default Navbar;
