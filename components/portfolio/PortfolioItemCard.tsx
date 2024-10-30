'use client'; // Ensure this is a Client Component

import React from 'react';
import { Portfolio } from '@/types/portfolio';

interface PortfolioItemCardProps {
  portfolio: Portfolio;
}

const PortfolioItemCard: React.FC<PortfolioItemCardProps> = ({ portfolio }) => {
  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{portfolio.title}</h3>
      <p className="text-sm text-gray-600">{portfolio.description}</p>
      <div className="mt-2">
        <span className="font-medium">Status:</span> {portfolio.status}
      </div>
      <div className="mt-1">
        <span className="font-medium">Progress:</span> {portfolio.progress}%
      </div>
      {/* Display Missions if available */}
      {portfolio.missions && portfolio.missions.length > 0 && (
        <div className="mt-2">
          <span className="font-medium">Missions:</span>
          <ul className="list-disc list-inside">
            {portfolio.missions.map((mission) => (
              <li key={mission.id}>{mission.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PortfolioItemCard; 