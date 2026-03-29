import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global Response Interceptor for Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Une erreur est survenue';
    
    // Only show toast for specific errors if needed, or all 4xx/5xx
    if (error.response?.status >= 400) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
  googleLogin: () => {
    window.location.href = `${API_URL}/auth/google`;
  },
};

// Product API
export const productAPI = {
  getAll: (params) => api.get('/products', { params }), // params can include category, search
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }), // params can include search
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getOrders: (params) => api.get('/admin/orders', { params }), // params can include search
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }),
};

export default api;
