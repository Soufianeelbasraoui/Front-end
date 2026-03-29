import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
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
            <h2>Bonjour, {user?.name} 👋</h2>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="user-dash-grid">
        <Link to="/cart" className="dash-card">
          <FaShoppingBag className="dash-card-icon icon-orders" />
          <h3>Mes commandes</h3>
          <p>Consultez vos achats et suivez vos livraisons</p>
        </Link>

        <Link to="/produits" className="dash-card">
          <FaHeart className="dash-card-icon icon-wishlist" />
          <h3>Mes favoris</h3>
          <p>Retrouvez vos produits préférés</p>
        </Link>

        <div className="dash-card">
          <FaCog className="dash-card-icon icon-settings" />
          <h3>Paramètres</h3>
          <p>Gérez votre profil et vos préférences</p>
        </div>

        <div className="dash-card dash-card-logout" onClick={handleLogout}>
          <FaSignOutAlt className="dash-card-icon icon-logout" />
          <h3>Se déconnecter</h3>
          <p>Déconnexion de votre compte</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
