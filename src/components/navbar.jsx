import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-left">
        <Link to="/" className="logo">
          EventBooker
        </Link>
      </div>

      <div className="navbar-right">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`}
        >
          Home
        </Link>

        <Link
          to="/my-bookings"
          className={`nav-link ${location.pathname === "/my-bookings" ? "active-link" : ""}`}
        >
          My Bookings
        </Link>

        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
