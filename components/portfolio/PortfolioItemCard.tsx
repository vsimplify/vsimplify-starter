'use client'; // Ensure this is a Client Component

import React from 'react';
import { Portfolio } from '@/types/portfolio';
import { Card } from '@/components/ui/card';
import { getMetricsSummary } from '@/lib/metrics';

interface PortfolioItemCardProps {
  portfolio: Portfolio;
  metrics: ReturnType<typeof getMetricsSummary> | null;
}

const PortfolioItemCard: React.FC<PortfolioItemCardProps> = ({ portfolio, metrics }) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold">{portfolio.title}</h3>
      <p className="text-sm text-gray-600">{portfolio.description}</p>
      <div className="mt-2">
        <span className="font-medium">Status:</span> {portfolio.status}
      </div>
      <div className="mt-1">
        <span className="font-medium">Progress:</span> {portfolio.progress}%
      </div>
      {/* Display Project if available */}
      {portfolio.project && (
        <div className="mt-2">
          <span className="font-medium">Project:</span> {portfolio.project.title}
          {/* Display Missions within the project */}
          {portfolio.project.missions && portfolio.project.missions.length > 0 && (
            <ul className="list-disc list-inside ml-4">
              {portfolio.project.missions.map((mission) => (
                <li key={mission.id}>{mission.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {metrics && (
        <div className="mt-4">
          <p>Token Usage: {metrics.tokenUsage}</p>
          <p>Success Rate: {metrics.successRate}%</p>
          <p>Cost per Execution: ${metrics.cost}</p>
        </div>
      )}
    </Card>
  );
};

export default PortfolioItemCard; 