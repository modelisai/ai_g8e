import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AI Governance
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>
              AI Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/policies" className={`nav-link ${isActive('/policies')}`}>
              Policies
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/risk-assessment" className={`nav-link ${isActive('/risk-assessment')}`}>
              Risk Assessment
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/compliance" className={`nav-link ${isActive('/compliance')}`}>
              Compliance
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;