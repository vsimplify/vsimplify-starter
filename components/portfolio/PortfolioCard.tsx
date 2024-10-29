import React from 'react';
import { Agent } from '@/types/portfolio';

interface PortfolioCardProps {
  agent: Agent;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ agent }) => {
  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{agent.name}</h3>
    </div>
  );
};
