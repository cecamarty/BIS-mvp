import axios from 'axios';
import type { AuthRequest } from '../dto/AuthRequest.ts';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
apiClient.interceptors.request.use(
  (config) => {
    // Don't add token to auth endpoints
    if (!config.url?.includes('/auth/')) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Finance endpoints
export const getProfit = () => {
  return apiClient.get('/finance/profit');
};

export const addRevenue = (revenueData: { description: string, amount: number, date: string }) => {
  return apiClient.post('/finance/revenue', revenueData);
};

export const addExpense = (expenseData: { description: string, amount: number, date: string }) => {
  return apiClient.post('/finance/expense', expenseData);
};

export const getRevenues = () => {
    return apiClient.get('/finance/revenues');
};

export const getExpenses = () => {
    return apiClient.get('/finance/expenses');
};

// Auth endpoints
export const register = (authRequest: AuthRequest) => {
    return apiClient.post('/auth/register', authRequest);
};

export const login = (authRequest: AuthRequest) => {
    return apiClient.post('/auth/login', authRequest);
};
