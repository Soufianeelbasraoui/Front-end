import Featuredproducts from '../data/featuredProducts';

const STORAGE_KEYS = {
  USERS: 'mock_users',
  ORDERS: 'mock_orders',
  PRODUCTS: 'mock_products',
  CURRENT_USER: 'mock_current_user',
};

const INITIAL_USERS = [
  {
    id: 1,
    name: 'Admin Principal',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    created_at: '2025-01-10T10:00:00Z',
  },
  {
    id: 2,
    name: 'Karim Alaoui',
    email: 'user@example.com',
    password: 'user',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    created_at: '2025-01-20T14:30:00Z',
  },
  {
    id: 3,
    name: 'Sara Bennani',
    email: 'sara@example.com',
    password: 'user',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    created_at: '2025-02-05T09:15:00Z',
  },
  {
    id: 4,
    name: 'Youssef Idrissi',
    email: 'youssef@example.com',
    password: 'user',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    created_at: '2025-02-12T16:20:00Z',
  },
];

const INITIAL_ORDERS = [
  {
    id: 1001,
    user: { id: 2, name: 'Karim Alaoui', email: 'user@example.com' },
    total: 450,
    status: 'delivered',
    created_at: '2025-02-10T12:00:00Z',
  },
  {
    id: 1002,
    user: { id: 3, name: 'Sara Bennani', email: 'sara@example.com' },
    total: 720,
    status: 'processing',
    created_at: '2025-02-12T15:30:00Z',
  },
  {
    id: 1003,
    user: { id: 4, name: 'Youssef Idrissi', email: 'youssef@example.com' },
    total: 310,
    status: 'shipped',
    created_at: '2025-02-14T08:45:00Z',
  },
  {
    id: 1004,
    user: { id: 2, name: 'Karim Alaoui', email: 'user@example.com' },
    total: 190,
    status: 'pending',
    created_at: '2025-02-14T11:20:00Z',
  },
  {
    id: 1005,
    user: { id: 3, name: 'Sara Bennani', email: 'sara@example.com' },
    total: 540,
    status: 'delivered',
    created_at: '2025-02-15T14:10:00Z',
  },
];

const getInitialProducts = () => {
  return (Featuredproducts || []).map((p) => {
    let numericPrice = 150;
    if (typeof p.newPrice === 'number') {
      numericPrice = p.newPrice;
    } else if (typeof p.newPrice === 'string') {
      const match = p.newPrice.replace(/[^0-9.]/g, '');
      numericPrice = parseFloat(match) || 150;
    }

    return {
      id: p.id,
      title: p.title || 'Produit',
      category: p.category || 'Général',
      new_price: numericPrice,
      newPrice: p.newPrice,
      prevPrice: p.prevPrice,
      img: p.img,
      rating: p.rating || 4.5,
      reviews: p.reviews || '1k',
      inStock: p.inStock ?? true,
      description: p.description || '',
    };
  });
};

const getStored = (key, defaultVal) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn(err);
  }
};

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuthAPI = {
  login: async ({ email, password }) => {
    await delay();
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      const isAdmin = email.toLowerCase().includes('admin');
      user = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        role: isAdmin ? 'admin' : 'user',
        created_at: new Date().toISOString(),
        avatar: isAdmin
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      };
      setStored(STORAGE_KEYS.USERS, [...users, user]);
    }

    const token = 'mock_jwt_token_' + Date.now();
    setStored(STORAGE_KEYS.CURRENT_USER, user);
    localStorage.setItem('token', token);

    return {
      data: {
        token,
        user,
      },
    };
  },

  register: async ({ name, email, password }) => {
    await delay();
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      existing.name = name;
      setStored(STORAGE_KEYS.USERS, users);
      setStored(STORAGE_KEYS.CURRENT_USER, existing);
      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('token', token);
      return { data: { token, user: existing } };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
    };

    setStored(STORAGE_KEYS.USERS, [...users, newUser]);
    setStored(STORAGE_KEYS.CURRENT_USER, newUser);
    const token = 'mock_jwt_token_' + Date.now();
    localStorage.setItem('token', token);

    return {
      data: {
        token,
        user: newUser,
      },
    };
  },

  logout: async () => {
    await delay(50);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem('token');
    return { data: { message: 'Déconnecté' } };
  },

  getUser: async () => {
    await delay();
    const storedUser = getStored(STORAGE_KEYS.CURRENT_USER, null);
    if (storedUser) {
      return { data: storedUser };
    }

    const token = localStorage.getItem('token');
    if (token) {
      const defaultUser = INITIAL_USERS[0];
      setStored(STORAGE_KEYS.CURRENT_USER, defaultUser);
      return { data: defaultUser };
    }

    throw new Error('Non authentifié');
  },

  googleLogin: () => {
    const googleUser = {
      id: 999,
      name: 'Utilisateur Google',
      email: 'user.google@gmail.com',
      role: 'user',
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      created_at: new Date().toISOString(),
    };
    const token = 'mock_google_token_' + Date.now();
    setStored(STORAGE_KEYS.CURRENT_USER, googleUser);
    localStorage.setItem('token', token);
    window.location.href = '/dashboard';
  },
};

export const mockProductAPI = {
  getAll: async (params = {}) => {
    await delay();
    let products = getStored(STORAGE_KEYS.PRODUCTS, null);
    if (!products || products.length === 0) {
      products = getInitialProducts();
      setStored(STORAGE_KEYS.PRODUCTS, products);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    if (params.category && params.category !== 'all') {
      products = products.filter((p) => p.category === params.category);
    }

    return { data: products };
  },

  getById: async (id) => {
    await delay();
    const products = getStored(STORAGE_KEYS.PRODUCTS, getInitialProducts());
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) {
      throw new Error('Produit introuvable');
    }
    return { data: product };
  },

  create: async (data) => {
    await delay();
    const products = getStored(STORAGE_KEYS.PRODUCTS, getInitialProducts());
    const newProduct = {
      id: Date.now(),
      ...data,
      new_price: data.new_price || data.price || 150,
      created_at: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    setStored(STORAGE_KEYS.PRODUCTS, updated);
    return { data: newProduct };
  },

  update: async (id, data) => {
    await delay();
    const products = getStored(STORAGE_KEYS.PRODUCTS, getInitialProducts());
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) throw new Error('Produit introuvable');
    products[index] = { ...products[index], ...data };
    setStored(STORAGE_KEYS.PRODUCTS, products);
    return { data: products[index] };
  },

  delete: async (id) => {
    await delay();
    const products = getStored(STORAGE_KEYS.PRODUCTS, getInitialProducts());
    const filtered = products.filter((p) => String(p.id) !== String(id));
    setStored(STORAGE_KEYS.PRODUCTS, filtered);
    return { data: { message: 'Produit supprimé' } };
  },
};

export const mockAdminAPI = {
  getStats: async () => {
    await delay();
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const orders = getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const products = getStored(STORAGE_KEYS.PRODUCTS, getInitialProducts());

    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const stats = {
      total_users: users.length,
      total_products: products.length,
      total_orders: orders.length,
      total_revenue: totalRevenue,
      revenue_chart: [
        { date: 'Lun', revenue: 1450 },
        { date: 'Mar', revenue: 2100 },
        { date: 'Mer', revenue: 1800 },
        { date: 'Jeu', revenue: 2900 },
        { date: 'Ven', revenue: 3400 },
        { date: 'Sam', revenue: 4200 },
        { date: 'Dim', revenue: 3850 },
      ],
      status_chart: [
        { status: 'Livré', count: orders.filter((o) => o.status === 'delivered').length || 18 },
        { status: 'En cours', count: orders.filter((o) => o.status === 'processing').length || 7 },
        { status: 'Expédié', count: orders.filter((o) => o.status === 'shipped').length || 9 },
        { status: 'En attente', count: orders.filter((o) => o.status === 'pending').length || 4 },
      ],
    };

    return { data: stats };
  },

  getUsers: async (params = {}) => {
    await delay();
    let users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    if (params.search) {
      const q = params.search.toLowerCase();
      users = users.filter(
        (u) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q)
      );
    }
    return { data: users };
  },

  updateUserRole: async (id, role) => {
    await delay();
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = users.map((u) => (u.id === id ? { ...u, role } : u));
    setStored(STORAGE_KEYS.USERS, updated);
    return { data: { message: 'Rôle mis à jour' } };
  },

  deleteUser: async (id) => {
    await delay();
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = users.filter((u) => u.id !== id);
    setStored(STORAGE_KEYS.USERS, updated);
    return { data: { message: 'Utilisateur supprimé' } };
  },

  getOrders: async (params = {}) => {
    await delay();
    let orders = getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    if (params.search) {
      const q = params.search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.user?.name?.toLowerCase().includes(q) ||
          String(o.id).includes(q)
      );
    }
    return { data: orders };
  },

  updateOrderStatus: async (id, status) => {
    await delay();
    const orders = getStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setStored(STORAGE_KEYS.ORDERS, updated);
    return { data: { message: 'Statut mis à jour' } };
  },
};
