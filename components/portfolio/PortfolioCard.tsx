import React from 'react';
import { Agent } from '@/types/portfolio';

interface PortfolioCardProps {
  agent: Agent;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ agent }) => {
  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{agent.title}</h3>
      <p className="text-sm text-gray-600">{agent.role}</p>
      {agent.goal && (
        <p className="mt-2 text-sm">{agent.goal}</p>
      )}
    </div>
  );
};
