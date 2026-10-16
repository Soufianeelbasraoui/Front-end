import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from 'react-bootstrap';

/**
 * ProtectedRoute
 * Assure que l'utilisateur est authentifié via le token / session backend.
 * Redirige vers /Connecter en conservant la route demandée dans location.state.
 */
export default function ProtectedRoute({ children, redirectTo = '/Connecter' }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div 
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          color: '#475569'
        }}
      >
        <Spinner animation="border" variant="primary" />
        <p style={{ fontWeight: 500, fontSize: '1rem' }}>Vérification de l'authentification...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
