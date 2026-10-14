import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo({ size = 'md', showTagline = false, light = false, to = '/' }) {
  return (
    <Link to={to} className={`clickstore-brand ${size} ${light ? 'light' : ''}`}>
      <div className="brand-icon-box">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round"
          />
          <path 
            d="M4.5 8.5C4.5 7.67157 5.17157 7 6 7H18C18.8284 7 19.5 7.67157 19.5 8.5L20.6 19.2C20.6865 20.0475 20.0202 20.7778 19.1691 20.7778H4.83087C3.9798 20.7778 3.31354 20.0475 3.4 19.2L4.5 8.5Z" 
            fill="currentColor" 
            fillOpacity="0.22" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            d="M12 10.5L14.2 14.8L11.8 14.3L10 16.5L12 10.5Z" 
            fill="#ffffff"
          />
        </svg>
      </div>
      <div className="brand-text-container">
        <div className="brand-name">
          <span className="brand-click">Click</span>
          <span className="brand-store">Store</span>
        </div>
        {showTagline && <span className="brand-tagline">Boutique en ligne</span>}
      </div>
    </Link>
  );
}

export default Logo;
