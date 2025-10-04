import React from 'react';

interface ProfitDisplayProps {
  profit: number | null;
}

const ProfitDisplay: React.FC<ProfitDisplayProps> = ({ profit }) => {
  return (
    <div>
      <h2>Profit</h2>
      <p>{profit !== null ? `$${profit.toFixed(2)}` : 'Loading...'}</p>
    </div>
  );
};

export default ProfitDisplay;