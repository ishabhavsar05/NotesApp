import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      padding: '1rem',
      marginTop: '2rem',
      fontSize: '14px'
    }}>
      © {new Date().getFullYear()} MyNoteApp. All rights reserved.
    </footer>
  );
};

export default Footer;
