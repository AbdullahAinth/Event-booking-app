import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-brand">
          EventGo
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">
          Events
        </Link>
        <Link to="/my-bookings" className="nav-link">
          My Bookings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
