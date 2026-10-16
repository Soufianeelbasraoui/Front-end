import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from 'react-bootstrap';

/**
 * RoleGuard
 * Vérifie que l'utilisateur connecté possède le(s) rôle(s) requis par le backend ('admin', 'user', etc.).
 * 
 * Props:
 * - allowedRoles: string ou tableau de rôles autorisés (ex: ['admin'] ou ['user', 'admin'] ou 'admin')
 * - fallbackPath: chemin de redirection si le rôle ne correspond pas (défaut: '/unauthorized')
 * - children: composant enfant (ou Outlet pour nested routes)
 */
export default function RoleGuard({ 
  allowedRoles = [], 
  fallbackPath = '/unauthorized', 
  children 
}) {
  const { user, isAuthenticated, loading, hasAnyRole } = useAuth();
  const location = useLocation();

  // 1. État de chargement pendant la vérification du token backend
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
        <p style={{ fontWeight: 500, fontSize: '1rem' }}>Vérification des autorisations...</p>
      </div>
    );
  }

  // 2. Si non authentifié, rediriger vers la page de connexion
  if (!isAuthenticated || !user) {
    return <Navigate to="/Connecter" state={{ from: location }} replace />;
  }

  // Normaliser les rôles autorisés en tableau
  const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  // 3. Vérifier les rôles autorisés
  const isAuthorized = rolesArray.length === 0 || hasAnyRole(rolesArray);

  if (!isAuthorized) {
    // Redirection si les droits sont insuffisants
    return (
      <Navigate 
        to={fallbackPath} 
        state={{ 
          from: location, 
          requiredRoles: rolesArray, 
          currentRole: user.role 
        }} 
        replace 
      />
    );
  }

  return children ? children : <Outlet />;
}
