import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { orderAPI } from '../../services/api';
import { 
  FaUser, FaShoppingBag, FaHeart, FaUserShield, FaSignOutAlt, 
  FaArrowRight, FaBox, FaClock, FaCheckCircle, FaTruck, 
  FaTimesCircle, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, 
  FaCreditCard, FaEye, FaTimes, FaSyncAlt
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './UserDashboard.css';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'orders', 'profile'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const res = await orderAPI.getAll();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes :", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  // Calculs statistiques
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
  const activeOrders = orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return <span className="status-badge badge-delivered"><FaCheckCircle className="me-1" /> Livrée</span>;
      case 'shipped':
        return <span className="status-badge badge-shipped"><FaTruck className="me-1" /> Expédiée</span>;
      case 'processing':
        return <span className="status-badge badge-processing"><FaClock className="me-1" /> En cours</span>;
      case 'cancelled':
        return <span className="status-badge badge-cancelled"><FaTimesCircle className="me-1" /> Annulée</span>;
      case 'pending':
      default:
        return <span className="status-badge badge-pending"><FaClock className="me-1" /> En attente</span>;
    }
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className="user-dashboard">
        {/* En-tête profil */}
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
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h2>{user?.name || 'Utilisateur'}</h2>
                <span className={`role-badge ${isAdmin ? 'admin-badge' : 'user-badge'}`}>
                  {isAdmin ? 'Administrateur' : 'Client Vérifié'}
                </span>
              </div>
              <p className="user-email">
                <FaEnvelope className="me-1 text-muted" /> {user?.email}
              </p>
              <div className="user-meta-tags">
                {user?.created_at && (
                  <span className="date-badge">
                    <FaCalendarAlt className="me-1" /> Membre depuis le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="header-action-buttons">
            {isAdmin && (
              <Link to="/admin" className="admin-portal-btn">
                <FaUserShield className="me-2" /> Panneau Admin
              </Link>
            )}
            <button onClick={handleLogout} className="logout-btn-header" title="Se déconnecter">
              <FaSignOutAlt className="me-1" /> Déconnexion
            </button>
          </div>
        </div>

        {/* Navigation par Onglets */}
        <div className="dashboard-tabs">
          <button 
            className={`dash-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Vue d'ensemble
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Mes Commandes <span className="tab-counter">{totalOrders}</span>
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Mon Profil & Sécurité
          </button>
        </div>

        {/* 1. Onglet VUE D'ENSEMBLE */}
        {activeTab === 'overview' && (
          <div className="tab-pane-content">
            {/* Grille de statistiques */}
            <div className="user-stats-grid">
              <div className="u-stat-card">
                <div className="u-stat-icon icon-box">
                  <FaBox />
                </div>
                <div className="u-stat-info">
                  <span className="u-stat-label">Total Commandes</span>
                  <span className="u-stat-value">{totalOrders}</span>
                </div>
              </div>

              <div className="u-stat-card">
                <div className="u-stat-icon icon-money">
                  <FaCreditCard />
                </div>
                <div className="u-stat-info">
                  <span className="u-stat-label">Total Dépenses</span>
                  <span className="u-stat-value">{totalSpent.toFixed(2)} MAD</span>
                </div>
              </div>

              <div className="u-stat-card">
                <div className="u-stat-icon icon-truck">
                  <FaTruck />
                </div>
                <div className="u-stat-info">
                  <span className="u-stat-label">En Cours de Livraison</span>
                  <span className="u-stat-value">{activeOrders}</span>
                </div>
              </div>

              <div className="u-stat-card">
                <div className="u-stat-icon icon-check">
                  <FaCheckCircle />
                </div>
                <div className="u-stat-info">
                  <span className="u-stat-label">Commandes Livrées</span>
                  <span className="u-stat-value">{deliveredOrders}</span>
                </div>
              </div>
            </div>

            {/* Section Dernières Commandes */}
            <div className="dash-section-card">
              <div className="section-card-header">
                <div>
                  <h3>Mes Dernières Commandes</h3>
                  <p className="section-desc">Suivez l'état d'expédition de vos derniers achats</p>
                </div>
                <button 
                  onClick={() => setActiveTab('orders')} 
                  className="btn-link-action"
                >
                  Voir tout ({totalOrders}) <FaArrowRight className="ms-1" />
                </button>
              </div>

              {loading ? (
                <div className="dash-loading-box">
                  <Spinner animation="border" size="sm" variant="primary" />
                  <span>Chargement de vos commandes...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="dash-empty-box">
                  <FaShoppingBag className="empty-icon" />
                  <h4>Vous n'avez pas encore passé de commande</h4>
                  <p>Découvrez notre vaste sélection d'articles et profitez de la livraison rapide.</p>
                  <Link to="/produits" className="btn-explore-now">
                    Explorer la boutique
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="user-orders-table">
                    <thead>
                      <tr>
                        <th>N° Commande</th>
                        <th>Date</th>
                        <th>Articles</th>
                        <th>Total</th>
                        <th>Statut</th>
                        <th>Détails</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 3).map((order) => (
                        <tr key={order.id}>
                          <td className="order-number">#{order.id}</td>
                          <td>{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                          <td>
                            {order.items?.length || 1} article{(order.items?.length || 1) > 1 ? 's' : ''}
                          </td>
                          <td className="order-price">{parseFloat(order.total).toFixed(2)} MAD</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            <button 
                              className="btn-view-order"
                              onClick={() => setSelectedOrder(order)}
                              title="Afficher les détails"
                            >
                              <FaEye />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Raccourcis Rapides */}
            <div className="user-dash-grid">
              <Link to="/cart" className="dash-card">
                <div className="dash-card-icon icon-orders">
                  <FaShoppingBag />
                </div>
                <div className="dash-card-content">
                  <h3>Mon Panier d'Achat</h3>
                  <p>Consultez vos articles en attente et finalisez votre achat.</p>
                  <span className="dash-card-link">Voir mon panier <FaArrowRight className="ms-1" /></span>
                </div>
              </Link>

              <Link to="/produits" className="dash-card">
                <div className="dash-card-icon icon-wishlist">
                  <FaHeart />
                </div>
                <div className="dash-card-content">
                  <h3>Catalogue & Nouveautés</h3>
                  <p>Explorez les catégories mode, électroniques, sacs et meubles.</p>
                  <span className="dash-card-link">Voir le catalogue <FaArrowRight className="ms-1" /></span>
                </div>
              </Link>

              <Link to="/Lesoffers" className="dash-card">
                <div className="dash-card-icon icon-truck">
                  <FaBox />
                </div>
                <div className="dash-card-content">
                  <h3>Offres Spéciales Hot</h3>
                  <p>Profitez de réductions exclusives jusqu'à -60% sur les meilleures ventes.</p>
                  <span className="dash-card-link">Découvrir les offres <FaArrowRight className="ms-1" /></span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* 2. Onglet MES COMMANDES */}
        {activeTab === 'orders' && (
          <div className="tab-pane-content">
            <div className="dash-section-card">
              <div className="section-card-header">
                <div>
                  <h3>Historique Complet des Commandes</h3>
                  <p className="section-desc">Consultez et suivez toutes vos commandes passées sur ClickStore</p>
                </div>
                <button onClick={fetchUserOrders} className="btn-refresh-orders" title="Actualiser">
                  <FaSyncAlt className={loading ? 'spin' : ''} /> Actualiser
                </button>
              </div>

              {loading ? (
                <div className="dash-loading-box">
                  <Spinner animation="border" size="sm" variant="primary" />
                  <span>Chargement de vos commandes...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="dash-empty-box">
                  <FaShoppingBag className="empty-icon" />
                  <h4>Aucune commande trouvée</h4>
                  <p>Vos commandes apparaîtront ici dès que vous aurez validé votre panier.</p>
                  <Link to="/produits" className="btn-explore-now">
                    Faire des achats
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="user-orders-table">
                    <thead>
                      <tr>
                        <th>N° Commande</th>
                        <th>Date</th>
                        <th>Destinataire</th>
                        <th>Articles</th>
                        <th>Paiement</th>
                        <th>Total</th>
                        <th>Statut</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="order-number">#{order.id}</td>
                          <td>{new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                          <td>{order.shipping_name || user?.name}</td>
                          <td>
                            {order.items?.length || 1} article{(order.items?.length || 1) > 1 ? 's' : ''}
                          </td>
                          <td className="text-capitalize">{order.payment_method || 'Carte'}</td>
                          <td className="order-price">{parseFloat(order.total).toFixed(2)} MAD</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            <button 
                              className="btn-view-order"
                              onClick={() => setSelectedOrder(order)}
                              title="Voir les détails"
                            >
                              <FaEye className="me-1" /> Détails
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Onglet MON PROFIL */}
        {activeTab === 'profile' && (
          <div className="tab-pane-content">
            <div className="profile-details-grid">
              <div className="dash-section-card">
                <h3>Informations Personnelles</h3>
                <p className="section-desc">Données enregistrées de votre compte</p>
                <div className="profile-info-list">
                  <div className="profile-info-row">
                    <span className="info-label">Nom complet</span>
                    <span className="info-value">{user?.name}</span>
                  </div>
                  <div className="profile-info-row">
                    <span className="info-label">Adresse Email</span>
                    <span className="info-value">{user?.email}</span>
                  </div>
                  <div className="profile-info-row">
                    <span className="info-label">Rôle d'accès</span>
                    <span className="info-value text-capitalize">
                      <strong>{user?.role === 'admin' ? 'Administrateur' : 'Client standard'}</strong>
                    </span>
                  </div>
                  <div className="profile-info-row">
                    <span className="info-label">Date d'inscription</span>
                    <span className="info-value">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="dash-section-card">
                <h3>Livraison & Coordonnées</h3>
                <p className="section-desc">Adresse utilisée lors de vos commandes</p>
                <div className="profile-info-list">
                  <div className="profile-info-row">
                    <span className="info-label"><FaMapMarkerAlt className="me-1 text-danger" /> Adresse</span>
                    <span className="info-value">{orders[0]?.shipping_address || 'Casablanca, Maroc'}</span>
                  </div>
                  <div className="profile-info-row">
                    <span className="info-label">Téléphone</span>
                    <span className="info-value">{orders[0]?.shipping_phone || '+212 600-000000'}</span>
                  </div>
                  <div className="profile-info-row">
                    <span className="info-label">Mode préféré</span>
                    <span className="info-value">Paiement à la livraison / Carte</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Détails de Commande */}
      {selectedOrder && (
        <div className="user-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="user-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="user-modal-header">
              <div>
                <h3>Commande #{selectedOrder.id}</h3>
                <span className="order-date-modal">
                  Passée le {new Date(selectedOrder.created_at).toLocaleDateString('fr-FR')} à {new Date(selectedOrder.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="user-modal-body">
              <div className="modal-status-strip">
                <span>Statut :</span>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="modal-shipping-info">
                <h4>Informations de livraison</h4>
                <p><strong>Destinataire :</strong> {selectedOrder.shipping_name || user?.name}</p>
                <p><strong>Adresse :</strong> {selectedOrder.shipping_address || 'Non spécifiée'}</p>
                {selectedOrder.shipping_phone && <p><strong>Téléphone :</strong> {selectedOrder.shipping_phone}</p>}
                <p><strong>Paiement :</strong> {selectedOrder.payment_method === 'card' ? 'Carte bancaire' : 'Paiement à la livraison'}</p>
              </div>

              <h4>Articles commandés</h4>
              <div className="modal-items-list">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="modal-item-row">
                      {item.img && <img src={item.img} alt={item.title} className="modal-item-thumb" />}
                      <div className="modal-item-details">
                        <span className="modal-item-title">{item.title}</span>
                        <span className="modal-item-qty">Quantité : {item.quantity}</span>
                      </div>
                      <span className="modal-item-price">
                        {(parseFloat(item.price) * item.quantity).toFixed(2)} MAD
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Détails des articles non disponibles pour cette commande archivée.</p>
                )}
              </div>

              <div className="modal-total-summary">
                <div className="summary-row">
                  <span>Sous-total :</span>
                  <span>{parseFloat(selectedOrder.total).toFixed(2)} MAD</span>
                </div>
                <div className="summary-row">
                  <span>Livraison :</span>
                  <span className="text-success">Gratuite</span>
                </div>
                <div className="summary-row total-highlight">
                  <span>Total Réglé :</span>
                  <span>{parseFloat(selectedOrder.total).toFixed(2)} MAD</span>
                </div>
              </div>
            </div>

            <div className="user-modal-footer">
              <button className="btn-secondary-simple" onClick={() => setSelectedOrder(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
