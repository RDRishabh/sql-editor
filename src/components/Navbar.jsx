import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onSwitchMode, currentMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title fade-in" style={{ animationDelay: '0.1s' }}>
        <h1>SQL Query Interface</h1>
      </div>

      <div className="navbar-links">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="slide-right button button-secondary"
          style={{ animationDelay: '0.3s' }}
        >
          View on GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;