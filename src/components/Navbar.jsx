import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using React Router for navigation
import '../styles/Navbar.css';

const Navbar = () => {
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
        <Link
          to="/er-diagram" // Route for the ER Diagram page
          className="slide-right button button-primary"
          style={{ animationDelay: '0.4s', marginLeft: '1rem' }}
        >
          View ER Diagram
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
