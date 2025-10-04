import React, { useState } from 'react';

interface RevenueFormProps {
  onAddRevenue: (description: string, amount: number) => void;
}

const RevenueForm: React.FC<RevenueFormProps> = ({ onAddRevenue }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onAddRevenue(description, parseFloat(amount));
    setDescription('');
    setAmount('');
  };

  return (
    <div>
      <h3>Add Revenue</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default RevenueForm;