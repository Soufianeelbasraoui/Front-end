import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaShoppingBag, FaHeart, FaUserShield, FaSignOutAlt, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="user-dashboard-wrapper">
      <div className="user-dashboard">
        <div className="user-dash-header">
          <div className="user-dash-profile">
            <div className="user-dash-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" />
              ) : (
                <FaUser className="avatar-icon" />
              )}
            </div>
            <div className="user-dash-info">
              <h2>Bonjour, {user?.name || 'Utilisateur'}</h2>
              <p className="user-email">{user?.email}</p>
              <div className="user-meta-tags">
                <span className={`role-badge ${isAdmin ? 'admin-badge' : 'user-badge'}`}>
                  {isAdmin ? 'Administrateur' : 'Client'}
                </span>
                {user?.created_at && (
                  <span className="date-badge">
                    Membre depuis le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>
            </div>
          </div>
          {isAdmin && (
            <Link to="/admin" className="admin-portal-btn">
              <FaUserShield className="me-2" /> Panneau Admin
            </Link>
          )}
        </div>

        <div className="user-dash-grid">
          <Link to="/cart" className="dash-card">
            <div className="dash-card-icon icon-orders">
              <FaShoppingBag />
            </div>
            <div className="dash-card-content">
              <h3>Mon Panier & Commandes</h3>
              <p>Consultez vos articles sélectionnés et procédez à l'achat.</p>
              <span className="dash-card-link">Voir mon panier <FaArrowRight className="ms-1" /></span>
            </div>
          </Link>

          <Link to="/produits" className="dash-card">
            <div className="dash-card-icon icon-wishlist">
              <FaHeart />
            </div>
            <div className="dash-card-content">
              <h3>Catalogue Produits</h3>
              <p>Explorez toutes nos nouveautés, vêtements, électroniques et offres.</p>
              <span className="dash-card-link">Explorer la boutique <FaArrowRight className="ms-1" /></span>
            </div>
          </Link>

          {isAdmin && (
            <Link to="/admin" className="dash-card dash-card-admin">
              <div className="dash-card-icon icon-admin">
                <FaUserShield />
              </div>
              <div className="dash-card-content">
                <h3>Gestion de la Boutique</h3>
                <p>Gérez les stocks, utilisateurs, statistiques et commandes.</p>
                <span className="dash-card-link">Ouvrir le panneau <FaArrowRight className="ms-1" /></span>
              </div>
            </Link>
          )}

          <div className="dash-card dash-card-logout" onClick={handleLogout}>
            <div className="dash-card-icon icon-logout">
              <FaSignOutAlt />
            </div>
            <div className="dash-card-content">
              <h3>Se déconnecter</h3>
              <p>Fermez votre session en toute sécurité sur cet appareil.</p>
              <span className="dash-card-link text-danger">Déconnexion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
