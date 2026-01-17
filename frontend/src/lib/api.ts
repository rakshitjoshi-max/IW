import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Dashboard API
export const dashboardAPI = {
  getDashboard: () => api.get('/dashboard'),
  getRecommendations: () => api.get('/dashboard/recommendations'),
};

// Portfolio API
export const portfolioAPI = {
  getAll: () => api.get('/portfolios'),
  getOne: (id: string) => api.get(`/portfolios/${id}`),
  create: (data: any) => api.post('/portfolios', data),
  update: (id: string, data: any) => api.put(`/portfolios/${id}`, data),
  delete: (id: string) => api.delete(`/portfolios/${id}`),
  addHolding: (portfolioId: string, data: any) =>
    api.post(`/portfolios/${portfolioId}/holdings`, data),
  updateHolding: (portfolioId: string, holdingId: string, data: any) =>
    api.put(`/portfolios/${portfolioId}/holdings/${holdingId}`, data),
  deleteHolding: (portfolioId: string, holdingId: string) =>
    api.delete(`/portfolios/${portfolioId}/holdings/${holdingId}`),
};

// Goals API
export const goalsAPI = {
  getAll: () => api.get('/goals'),
  getOne: (id: string) => api.get(`/goals/${id}`),
  create: (data: any) => api.post('/goals', data),
  update: (id: string, data: any) => api.put(`/goals/${id}`, data),
  delete: (id: string) => api.delete(`/goals/${id}`),
};

// Risk Assessment API
export const riskAPI = {
  get: () => api.get('/risk-assessment'),
  create: (data: any) => api.post('/risk-assessment', data),
};
