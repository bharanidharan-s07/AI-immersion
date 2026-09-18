import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, Clock, History as HistoryIcon, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar" id="app-navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-brand" id="nav-brand-link">
          <div className="brand-icon">
            <Bus size={22} />
          </div>
          <div>
            <span className="brand-title">BUS ARRIVAL TIME</span>
            <span className="brand-subtitle">PREDICTION SYSTEM</span>
          </div>
        </Link>

        <ul className="nav-links" id="navbar-links-list">
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`} id="nav-link-home">
              <HomeIcon size={18} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/predict" className={`nav-link ${isActive('/predict')}`} id="nav-link-predict">
              <Clock size={18} />
              <span>Predict Arrival</span>
            </Link>
          </li>
          <li>
            <Link to="/history" className={`nav-link ${isActive('/history')}`} id="nav-link-history">
              <HistoryIcon size={18} />
              <span>History</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
