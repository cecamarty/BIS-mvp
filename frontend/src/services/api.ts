import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/finance',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProfit = () => {
  return apiClient.get('/profit');
};

export const addRevenue = (revenueData: { description: string, amount: number, date: string }) => {
  return apiClient.post('/revenue', revenueData);
};

export const addExpense = (expenseData: { description: string, amount: number, date: string }) => {
  return apiClient.post('/expense', expenseData);
};
