import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from 'react-bootstrap';

/**
 * GuestRoute
 * Empêche les utilisateurs déjà authentifiés d'accéder aux pages de login/inscription.
 * Redirige les admins vers /admin et les clients vers /dashboard.
 */
export default function GuestRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div 
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}
