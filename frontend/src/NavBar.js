import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Optionally call backend to destroy session
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CRPMS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Log Out</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addcars">Add Cars</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicerecords">Record</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/payments">Payments</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/optpayments">Manage Payments</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;