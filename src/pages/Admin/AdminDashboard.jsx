import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminAPI, productAPI } from '../../services/api';
import { 
  FaUsers, FaBoxOpen, FaShoppingCart, FaMoneyBillWave, FaTrash, 
  FaUserShield, FaUser, FaPlus, FaSearch, 
  FaArrowLeft, FaArrowRight, FaSyncAlt, FaEdit, FaHome, FaSignOutAlt,
  FaCheck, FaCog, FaTimes, FaChevronDown
} from 'react-icons/fa';
import { 
  MdOutlinePending, MdLocalShipping, MdDone, MdCancel, 
  MdDashboard, MdPeople, MdInventory, MdShoppingBag, MdSettings 
} from 'react-icons/md';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.css';

const COLORS = ['#e46036', '#2c3e50', '#28a745', '#0d6efd', '#f59e0b'];

const DEFAULT_SETTINGS = {
  storeName: 'ClickStore',
  tagline: 'Votre boutique e-commerce de référence',
  currency: 'MAD',
  freeShippingThreshold: 300,
  shippingFee: 35,
  supportEmail: 'support@clickstore.ma',
  supportPhone: '+212 5 22 00 00 00',
  storeAddress: 'Boulevard d\'Anfa, Casablanca, Maroc',
  announcement: '⚡ Soldes exclusives jusqu\'à -50% sur toute la collection !',
  bannerActive: true,
  maintenanceMode: false,
};

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Vêtements homme',
    new_price: '',
    prevPrice: '',
    img: '',
    description: '',
    inStock: true,
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('site_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, ordersRes, productsRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getUsers({ search }),
        adminAPI.getOrders({ search }),
        productAPI.getAll(),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success('Rôle mis à jour');
    } catch (err) {}
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    try {
      await adminAPI.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      toast.success('Utilisateur supprimé');
    } catch (err) {}
  };

  const handleOrderStatus = async (orderId, status) => {
    try {
      await adminAPI.updateOrderStatus(orderId, status);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
      toast.success('Statut de commande mis à jour');
    } catch (err) {}
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await productAPI.delete(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Produit supprimé');
    } catch (err) {}
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      category: 'Vêtements homme',
      new_price: '',
      prevPrice: '',
      img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
      description: '',
      inStock: true,
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title || '',
      category: prod.category || 'Vêtements homme',
      new_price: prod.new_price ?? prod.newPrice ?? '',
      prevPrice: prod.prevPrice || '',
      img: prod.img || '',
      description: prod.description || '',
      inStock: prod.inStock ?? true,
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.new_price) {
      toast.error('Le titre et le prix sont requis');
      return;
    }

    try {
      const priceNum = parseFloat(productForm.new_price) || 0;
      const dataToSave = {
        ...productForm,
        new_price: priceNum,
        newPrice: `${priceNum} MAD`,
      };

      if (editingProduct) {
        await productAPI.update(editingProduct.id, dataToSave);
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...dataToSave } : p));
        toast.success('Produit modifié avec succès');
      } else {
        const res = await productAPI.create(dataToSave);
        setProducts([res.data, ...products]);
        toast.success('Produit ajouté au catalogue');
      }
      setShowProductModal(false);
    } catch (err) {
      toast.error('Erreur lors de l\'enregistrement du produit');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('site_settings', JSON.stringify(settings));
      toast.success('Paramètres globaux enregistrés avec succès !');
    } catch {
      toast.error('Erreur lors de l\'enregistrement des paramètres');
    }
  };

  const handleResetSettings = () => {
    if (!window.confirm('Réinitialiser tous les paramètres aux valeurs par défaut ?')) return;
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('site_settings');
    toast.info('Paramètres réinitialisés');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const statusIcons = {
    pending: <MdOutlinePending />,
    processing: <MdLocalShipping />,
    shipped: <MdLocalShipping />,
    delivered: <MdDone />,
    cancelled: <MdCancel />,
  };

  if (loading && !stats) {
    return (
      <div className="admin-loading-skeleton">
        <div className="skeleton-sidebar"></div>
        <div className="skeleton-content">
          <div className="skeleton-header"></div>
          <div className="skeleton-grid">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
          <div className="skeleton-chart"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-dashboard ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="admin-sidebar">
        <div className="sidebar-logo">
          <FaUserShield className="logo-icon" />
          <span>ADMIN PANEL</span>
        </div>

        <nav className="admin-nav">
          <NavBtn icon={<MdDashboard />} label="Vue d'ensemble" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavBtn icon={<MdPeople />} label="Utilisateurs" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <NavBtn icon={<MdInventory />} label="Produits" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
          <NavBtn icon={<MdShoppingBag />} label="Commandes" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <NavBtn icon={<MdSettings />} label="Gestion Globale" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>

      <div className="admin-main">
        <header className="admin-header">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Rechercher partout..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>

          <div className="header-actions">
            <button className="refresh-btn" onClick={loadData} title="Rafraîchir les données">
              <FaSyncAlt className={loading ? 'spin' : ''} />
            </button>
            <div className="notification-bell">
              <div className="badge">{orders.length}</div>
              <FaShoppingCart />
            </div>

            <div className="admin-dropdown-container" ref={dropdownRef}>
              <button 
                type="button" 
                className={`admin-dropdown-trigger ${userDropdownOpen ? 'active' : ''}`}
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="trigger-avatar">
                  {user?.avatar ? <img src={user.avatar} alt="admin" /> : <FaUser />}
                </div>
                <div className="trigger-text">
                  <span className="trigger-name">{user?.name || 'Admin Principal'}</span>
                  <span className="trigger-role">Super Admin</span>
                </div>
                <FaChevronDown className={`trigger-arrow ${userDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="admin-dropdown-menu">
                  <div className="dropdown-user-header">
                    <span className="user-name">{user?.name || 'Admin Principal'}</span>
                    <span className="user-email">{user?.email || 'admin@example.com'}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  
                  <Link to="/" className="dropdown-item-link" onClick={() => setUserDropdownOpen(false)}>
                    <FaHome className="dropdown-icon" />
                    <span>Retour à l'accueil (Home)</span>
                  </Link>
                  
                  <button 
                    type="button" 
                    className="dropdown-item-btn" 
                    onClick={() => { setActiveTab('settings'); setUserDropdownOpen(false); }}
                  >
                    <FaCog className="dropdown-icon" />
                    <span>Gestion Globale</span>
                  </button>

                  <div className="dropdown-divider"></div>

                  <button 
                    type="button" 
                    className="dropdown-item-btn text-danger" 
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="admin-content-area">
          {activeTab === 'overview' && (
            <OverviewSection stats={stats} />
          )}

          {activeTab === 'users' && (
            <ListSection 
              title="Gestion des Utilisateurs" 
              subtitle={`${users.length} comptes enregistrés`}
              data={users} 
              renderTable={() => (
                <UsersTable users={users} onRoleChange={handleRoleChange} onDelete={handleDeleteUser} />
              )} 
            />
          )}

          {activeTab === 'products' && (
            <ListSection 
              title="Inventaire Produits" 
              subtitle={`${products.length} articles disponibles`}
              action={
                <button className="btn-primary" onClick={handleOpenAddProduct}>
                  <FaPlus /> Nouveau Produit
                </button>
              }
              data={products} 
              renderTable={() => (
                <ProductsTable 
                  products={products} 
                  onEdit={handleOpenEditProduct} 
                  onDelete={handleDeleteProduct} 
                />
              )} 
            />
          )}

          {activeTab === 'orders' && (
            <ListSection 
              title="Gestion des Commandes" 
              subtitle={`${orders.length} commandes enregistrées`}
              data={orders} 
              renderTable={() => (
                <OrdersTable orders={orders} onStatusChange={handleOrderStatus} statusIcons={statusIcons} />
              )} 
            />
          )}

          {activeTab === 'settings' && (
            <GlobalSettingsSection 
              settings={settings} 
              setSettings={setSettings} 
              onSave={handleSaveSettings}
              onReset={handleResetSettings}
            />
          )}
        </div>
      </div>

      {showProductModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal-card">
            <div className="custom-modal-header">
              <h3>{editingProduct ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}</h3>
              <button className="close-modal-btn" onClick={() => setShowProductModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="custom-modal-form">
              <div className="form-row-simple">
                <label>Nom du Produit *</label>
                <input 
                  type="text" 
                  value={productForm.title} 
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} 
                  placeholder="Ex: Veste chaude en laine" 
                  required 
                />
              </div>

              <div className="form-grid-two">
                <div className="form-row-simple">
                  <label>Catégorie</label>
                  <select 
                    value={productForm.category} 
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option value="Chaussures homme">Chaussures homme</option>
                    <option value="Vêtements homme">Vêtements homme</option>
                    <option value="Vêtements femme">Vêtements femme</option>
                    <option value="Électroniques">Électroniques</option>
                    <option value="Meubles">Meubles</option>
                    <option value="Sacs et bagages">Sacs et bagages</option>
                  </select>
                </div>

                <div className="form-row-simple">
                  <label>Prix (MAD) *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={productForm.new_price} 
                    onChange={(e) => setProductForm({ ...productForm, new_price: e.target.value })} 
                    placeholder="Ex: 249.00" 
                    required 
                  />
                </div>
              </div>

              <div className="form-row-simple">
                <label>URL de l'image</label>
                <input 
                  type="text" 
                  value={productForm.img} 
                  onChange={(e) => setProductForm({ ...productForm, img: e.target.value })} 
                  placeholder="https://..." 
                />
              </div>

              <div className="form-row-simple">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  value={productForm.description} 
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} 
                  placeholder="Description du produit..."
                ></textarea>
              </div>

              <div className="form-row-checkbox">
                <input 
                  type="checkbox" 
                  id="inStockCheck" 
                  checked={productForm.inStock} 
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })} 
                />
                <label htmlFor="inStockCheck">Produit disponible en stock</label>
              </div>

              <div className="custom-modal-footer">
                <button type="button" className="btn-secondary-simple" onClick={() => setShowProductModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary-simple">
                  {editingProduct ? 'Mettre à jour' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const NavBtn = ({ icon, label, active, onClick }) => (
  <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </button>
);

const OverviewSection = ({ stats }) => (
  <div className="overview-container">
    <div className="stats-grid">
      <StatCard icon={<FaUsers />} title="Total Clients" value={stats?.total_users} color="accent" trend="+12%" />
      <StatCard icon={<FaBoxOpen />} title="Produits" value={stats?.total_products} color="dark" trend="+3" />
      <StatCard icon={<FaShoppingCart />} title="Commandes" value={stats?.total_orders} color="green" trend="+8%" />
      <StatCard icon={<FaMoneyBillWave />} title="Revenu Total" value={`${stats?.total_revenue || 0} MAD`} color="gold" trend="+15%" />
    </div>

    <div className="charts-grid">
      <div className="chart-card main-chart">
        <h3>Performance de Revenu (7 jours)</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={stats?.revenue_chart || []}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e46036" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e46036" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eeeeee" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#e46036" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card pie-chart">
        <h3>Répartition par Statut</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats?.status_chart || []}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
                dataKey="count"
                nameKey="status"
              >
                {(stats?.status_chart || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, title, value, color, trend }) => (
  <div className={`stat-card-simple ${color}`}>
    <div className="stat-card-icon">{icon}</div>
    <div className="stat-card-body">
      <p>{title}</p>
      <h3>{value || 0}</h3>
      <span className="trend-badge">{trend}</span>
    </div>
  </div>
);

const ListSection = ({ title, subtitle, action, renderTable }) => (
  <div className="list-section">
    <div className="list-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
    <div className="table-responsive-simple">
      {renderTable()}
    </div>
  </div>
);

const UsersTable = ({ users, onRoleChange, onDelete }) => (
  <table className="admin-table-simple">
    <thead>
      <tr>
        <th>Utilisateur</th>
        <th>Rôle</th>
        <th>Inscrit le</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map(u => (
        <tr key={u.id}>
          <td>
            <div className="user-info-cell">
              <div className="user-img-small">
                {u.avatar ? <img src={u.avatar} alt="avatar" /> : <FaUser />}
              </div>
              <div>
                <span className="name">{u.name}</span>
                <span className="email">{u.email}</span>
              </div>
            </div>
          </td>
          <td>
            <select value={u.role} onChange={(e) => onRoleChange(u.id, e.target.value)} className="role-chip">
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </td>
          <td>{new Date(u.created_at).toLocaleDateString('fr-FR')}</td>
          <td>
            <button className="action-btn delete" onClick={() => onDelete(u.id)} title="Supprimer"><FaTrash /></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ProductsTable = ({ products, onEdit, onDelete }) => (
  <table className="admin-table-simple">
    <thead>
      <tr>
        <th>Produit</th>
        <th>Catégorie</th>
        <th>Prix</th>
        <th>Stock</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {products.map(p => (
        <tr key={p.id}>
          <td>
            <div className="product-info-cell">
              <img src={p.img} alt="" className="product-thumb" />
              <span>{p.title}</span>
            </div>
          </td>
          <td><span className="cat-badge">{p.category}</span></td>
          <td>{p.new_price ?? p.newPrice ?? 0} MAD</td>
          <td>
            <span className={`status-pill ${p.inStock ? 'pill-delivered' : 'pill-cancelled'}`}>
              {p.inStock ? 'En stock' : 'Épuisé'}
            </span>
          </td>
          <td className="actions-cell">
            <button className="action-btn edit" onClick={() => onEdit(p)} title="Modifier"><FaEdit /></button>
            <button className="action-btn delete" onClick={() => onDelete(p.id)} title="Supprimer"><FaTrash /></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const OrdersTable = ({ orders, onStatusChange, statusIcons }) => (
  <table className="admin-table-simple">
    <thead>
      <tr>
        <th>#ID</th>
        <th>Client</th>
        <th>Total</th>
        <th>Statut</th>
        <th>Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(o => (
        <tr key={o.id}>
          <td className="text-muted">#{o.id}</td>
          <td>{o.user?.name}</td>
          <td className="font-bold">{o.total} MAD</td>
          <td>
            <span className={`status-pill pill-${o.status}`}>
              {statusIcons[o.status]} {o.status}
            </span>
          </td>
          <td>{new Date(o.created_at).toLocaleDateString('fr-FR')}</td>
          <td>
            <select value={o.status} onChange={(e) => onStatusChange(o.id, e.target.value)} className="status-select-chip">
              <option value="pending">En attente</option>
              <option value="processing">En cours</option>
              <option value="shipped">Expédié</option>
              <option value="delivered">Livré</option>
              <option value="cancelled">Annulé</option>
            </select>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const GlobalSettingsSection = ({ settings, setSettings, onSave, onReset }) => (
  <div className="settings-page-card">
    <div className="settings-header">
      <div>
        <h2>Gestion Globale du Projet</h2>
        <p className="subtitle">Configurez les paramètres généraux de votre boutique en ligne</p>
      </div>
      <button type="button" className="btn-outline-danger-simple" onClick={onReset}>
        Réinitialiser par défaut
      </button>
    </div>

    <form onSubmit={onSave} className="settings-form">
      <div className="settings-grid">
        <div className="settings-panel">
          <h3>Identité de la Boutique</h3>
          <div className="form-row-simple">
            <label>Nom de la boutique</label>
            <input 
              type="text" 
              value={settings.storeName} 
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} 
            />
          </div>

          <div className="form-row-simple">
            <label>Slogan / Tagline</label>
            <input 
              type="text" 
              value={settings.tagline} 
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} 
            />
          </div>

          <div className="form-grid-two">
            <div className="form-row-simple">
              <label>Devise principale</label>
              <select 
                value={settings.currency} 
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              >
                <option value="MAD">Dirham Marocain (MAD)</option>
                <option value="DH">DH</option>
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dollar ($)</option>
              </select>
            </div>

            <div className="form-row-simple">
              <label>Frais de livraison standard ({settings.currency})</label>
              <input 
                type="number" 
                value={settings.shippingFee} 
                onChange={(e) => setSettings({ ...settings, shippingFee: Number(e.target.value) })} 
              />
            </div>
          </div>

          <div className="form-row-simple">
            <label>Livraison gratuite à partir de ({settings.currency})</label>
            <input 
              type="number" 
              value={settings.freeShippingThreshold} 
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })} 
            />
          </div>
        </div>

        <div className="settings-panel">
          <h3>Coordonnées & Support</h3>
          <div className="form-row-simple">
            <label>Email de support</label>
            <input 
              type="email" 
              value={settings.supportEmail} 
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} 
            />
          </div>

          <div className="form-row-simple">
            <label>Téléphone de contact</label>
            <input 
              type="text" 
              value={settings.supportPhone} 
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })} 
            />
          </div>

          <div className="form-row-simple">
            <label>Adresse physique</label>
            <input 
              type="text" 
              value={settings.storeAddress} 
              onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })} 
            />
          </div>

          <div className="form-row-simple">
            <label>Bannière d'annonces</label>
            <input 
              type="text" 
              value={settings.announcement} 
              onChange={(e) => setSettings({ ...settings, announcement: e.target.value })} 
            />
          </div>

          <div className="form-row-checkbox">
            <input 
              type="checkbox" 
              id="bannerCheck" 
              checked={settings.bannerActive} 
              onChange={(e) => setSettings({ ...settings, bannerActive: e.target.checked })} 
            />
            <label htmlFor="bannerCheck">Activer la bannière promotionnelle en haut du site</label>
          </div>
        </div>
      </div>

      <div className="settings-footer-actions">
        <button type="submit" className="btn-save-settings">
          <FaCheck className="me-2" /> Enregistrer les paramètres globaux
        </button>
      </div>
    </form>
  </div>
);

export default AdminDashboard;
