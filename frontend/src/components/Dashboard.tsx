import { useState, useEffect } from 'react';
import { getProfit, addRevenue, addExpense } from '../services/api';
import ProfitDisplay from './ProfitDisplay';
import RevenueForm from './RevenueForm';
import ExpenseForm from './ExpenseForm';

const Dashboard = () => {
  const [profit, setProfit] = useState<number | null>(null);

  const fetchProfit = async () => {
    try {
      const response = await getProfit();
      setProfit(response.data.profit);
    } catch (error) {
      console.error("Error fetching profit:", error);
    }
  };

  useEffect(() => {
    fetchProfit();
  }, []);

  const handleAddRevenue = async (description: string, amount: number) => {
    try {
      const revenueData = { description, amount, date: new Date().toISOString().split('T')[0] };
      await addRevenue(revenueData);
      fetchProfit();
    } catch (error) {
      console.error("Error adding revenue:", error);
    }
  };

  const handleAddExpense = async (description: string, amount: number) => {
    try {
      const expenseData = { description, amount, date: new Date().toISOString().split('T')[0] };
      await addExpense(expenseData);
      fetchProfit();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <ProfitDisplay profit={profit} />
        <div className="forms-container">
          <RevenueForm onAddRevenue={handleAddRevenue} />
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
