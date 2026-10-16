import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShieldAlt, FaHome, FaTachometerAlt, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Unauthorized.css';

export default function Unauthorized() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const requiredRoles = location.state?.requiredRoles || ['admin'];
  const currentRole = user?.role || 'visiteur';

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="unauthorized-icon-wrapper">
          <div className="icon-pulse"></div>
          <FaShieldAlt className="unauthorized-icon" />
          <FaLock className="lock-badge-icon" />
        </div>

        <span className="error-code-badge">Erreur 403 • Accès Refusé</span>

        <h1 className="unauthorized-title">Zone Réservée</h1>

        <p className="unauthorized-text">
          Désolé, votre compte actuel ne dispose pas des autorisations nécessaires pour accéder à cette section.
        </p>

        <div className="role-comparison-box">
          <div className="role-col">
            <span className="role-label">Votre Rôle Actuel</span>
            <span className={`role-pill pill-${currentRole}`}>
              {currentRole.toUpperCase()}
            </span>
          </div>
          <div className="role-divider">➔</div>
          <div className="role-col">
            <span className="role-label">Rôle(s) Requis</span>
            <span className="role-pill pill-required">
              {requiredRoles.join(', ').toUpperCase()}
            </span>
          </div>
        </div>

        <div className="unauthorized-actions">
          <Link to="/" className="btn-unauth btn-outline">
            <FaHome className="me-2" /> Retour à l'accueil
          </Link>
          {isAuthenticated && (
            <Link 
              to={user?.role === 'admin' ? '/admin' : '/dashboard'} 
              className="btn-unauth btn-primary-custom"
            >
              <FaTachometerAlt className="me-2" /> Mon Espace ({user?.role === 'admin' ? 'Admin' : 'Client'})
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
