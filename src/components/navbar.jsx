import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import "../App.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-brand">
        <Link to="/" className="logo">🎟️ Event Booking</Link>
      </div>
      <div className="navbar-center-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/my-bookings" className="nav-link">My Bookings</Link>
      </div>
      <div className="navbar-controls">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;