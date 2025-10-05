import { useState, useEffect } from 'react';
import { getProfit } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FinancialData = {
  totalRevenue: number;
  totalExpense: number;
  profit: number;
};

export default function DashboardPage() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalRevenue: 0,
    totalExpense: 0,
    profit: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setError(null);
      const response = await getProfit();
      const profit = response.data.profit || 0;
      
      // For now, we'll calculate based on profit
      // You'll need to add API endpoints for totalRevenue and totalExpense
      setFinancialData({
        totalRevenue: profit > 0 ? Math.abs(profit) * 1.5 : 0,
        totalExpense: profit > 0 ? Math.abs(profit) * 0.5 : Math.abs(profit),
        profit: profit,
      });
    } catch (err: any) {
      console.error('Error fetching financial data:', err);
      
      // Check if it's a 403 (authentication error)
      if (err.response?.status === 403) {
        setError('Authentication required. Please log in again.');
      } else {
        setError('Unable to load financial data. Using default values.');
      }
      
      // Set default data so the UI still renders
      setFinancialData({
        totalRevenue: 0,
        totalExpense: 0,
        profit: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Revenues',
      value: financialData.totalRevenue,
      icon: '💰',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      trend: '+12.5%',
    },
    {
      title: 'Total Expenses',
      value: financialData.totalExpense,
      icon: '💸',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      trend: '+8.3%',
    },
    {
      title: 'Profit/Loss',
      value: financialData.profit,
      icon: '📊',
      color: financialData.profit >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: financialData.profit >= 0 ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950',
      trend: financialData.profit >= 0 ? '+5.2%' : '-2.1%',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                {error}
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                Make sure your backend is running and you're logged in.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card, index) => (
          <Card key={index} className={card.bgColor}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </CardTitle>
              <span className="text-2xl">{card.icon}</span>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {formatCurrency(card.value)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span className={card.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {card.trend}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Chart will be here (install recharts)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Chart will be here (install recharts)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              No recent transactions to display
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
