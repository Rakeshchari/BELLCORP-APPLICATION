import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎟️ EventHub
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <NavLink to="/" className="navbar-link">
              Events
            </NavLink>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/dashboard" className="navbar-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="navbar-user">
                <span className="navbar-username">Hi, {user?.name}</span>
                <button onClick={logout} className="navbar-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="navbar-link">
                  Login
                </NavLink>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-small">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
