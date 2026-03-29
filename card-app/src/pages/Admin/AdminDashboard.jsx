import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI, productAPI } from '../../services/api';
import { 
  FaUsers, FaBoxOpen, FaShoppingCart, FaMoneyBillWave, FaTrash, 
  FaUserShield, FaUser, FaPlus, FaSearch, FaEllipsisV, 
  FaArrowLeft, FaArrowRight, FaSyncAlt, FaEdit 
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

const COLORS = ['#667eea', '#4facfe', '#43e97b', '#f093fb', '#ff4757'];

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load All Data
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
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Actions
  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success('Rôle mis à jour');
    } catch (err) {
      // toast already handled by interceptor
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    try {
      await adminAPI.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      toast.success('Utilisateur supprimé');
    } catch (err) { }
  };

  const handleOrderStatus = async (orderId, status) => {
    try {
      await adminAPI.updateOrderStatus(orderId, status);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
      toast.success('Statut de commande mis à jour');
    } catch (err) { }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    try {
      await productAPI.delete(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Produit supprimé');
    } catch (err) { }
  };

  const statusIcons = {
    pending: <MdOutlinePending />,
    processing: <MdLocalShipping />,
    shipped: <MdLocalShipping />,
    delivered: <MdDone />,
    cancelled: <MdCancel />,
  };

  // Render Skeleton
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
      
      {/* Dynamic Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-logo">
          <FaUserShield className="logo-icon" />
          <span>ADMIN PANEL</span>
        </div>
        
        <div className="admin-profile-section">
          <div className="admin-avatar">
            {user?.avatar ? <img src={user.avatar} alt="admin" /> : <FaUser />}
          </div>
          <div className="admin-info">
            <h4>{user?.name}</h4>
            <p>Super Administrateur</p>
          </div>
        </div>

        <nav className="admin-nav">
          <NavBtn icon={<MdDashboard />} label="Vue d'ensemble" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavBtn icon={<MdPeople />} label="Utilisateurs" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <NavBtn icon={<MdInventory />} label="Produits" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
          <NavBtn icon={<MdShoppingBag />} label="Commandes" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <div className="nav-divider"></div>
          <NavBtn icon={<MdSettings />} label="Paramètres" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>

      <div className="admin-main">
        {/* Header */}
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
              <div className="badge">3</div>
              <FaShoppingCart />
            </div>
            <div className="language-selector">FR</div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="admin-content-area">
          {activeTab === 'overview' && (
            <OverviewSection stats={stats} />
          )}

          {activeTab === 'users' && (
            <ListSection 
              title="Utilisateurs" 
              data={users} 
              renderTable={() => (
                <UsersTable users={users} onRoleChange={handleRoleChange} onDelete={handleDeleteUser} />
              )} 
            />
          )}

          {activeTab === 'products' && (
            <ListSection 
              title="Inventaire Produits" 
              subtitle={`${products.length} produits en stock`}
              action={<button className="btn-primary"><FaPlus /> Nouveau Produit</button>}
              data={products} 
              renderTable={() => (
                <ProductsTable products={products} onDelete={handleDeleteProduct} />
              )} 
            />
          )}

          {activeTab === 'orders' && (
            <ListSection 
              title="Gestion des Commandes" 
              data={orders} 
              renderTable={() => (
                <OrdersTable orders={orders} onStatusChange={handleOrderStatus} statusIcons={statusIcons} />
              )} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components
const NavBtn = ({ icon, label, active, onClick }) => (
  <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    <span className="nav-icon">{icon}</span>
    <span className="nav-label">{label}</span>
  </button>
);

const OverviewSection = ({ stats }) => (
  <div className="overview-container">
    <div className="stats-grid">
      <StatCard icon={<FaUsers />} title="Total Clients" value={stats?.total_users} color="purple" trend="+12%" />
      <StatCard icon={<FaBoxOpen />} title="Produits" value={stats?.total_products} color="blue" trend="+3" />
      <StatCard icon={<FaShoppingCart />} title="Commandes" value={stats?.total_orders} color="emerald" trend="+8%" />
      <StatCard icon={<FaMoneyBillWave />} title="Revenu Total" value={`${stats?.total_revenue} MAD`} color="gold" trend="+15%" />
    </div>

    <div className="charts-grid">
      <div className="chart-card main-chart">
        <h3>Performance de Revenu (7 jours)</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats?.revenue_chart || []}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#667eea" fillOpacity={1} fill="url(#colorRevenue)" />
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
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
                nameKey="status"
              >
                {stats?.status_chart?.map((entry, index) => (
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
  <div className={`stat-card-premium ${color}`}>
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
    <div className="table-responsive-premium">
      {renderTable()}
    </div>
  </div>
);

const UsersTable = ({ users, onRoleChange, onDelete }) => (
  <table className="admin-table-premium">
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
            <button className="action-btn delete" onClick={() => onDelete(u.id)}><FaTrash /></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ProductsTable = ({ products, onDelete }) => (
  <table className="admin-table-premium">
    <thead>
      <tr>
        <th>Produit</th>
        <th>Catégorie</th>
        <th>Prix</th>
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
          <td>{p.new_price} MAD</td>
          <td className="actions-cell">
            <button className="action-btn edit"><FaEdit /></button>
            <button className="action-btn delete" onClick={() => onDelete(p.id)}><FaTrash /></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const OrdersTable = ({ orders, onStatusChange, statusIcons }) => (
  <table className="admin-table-premium">
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

export default AdminDashboard;
