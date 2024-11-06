'use client'; // Ensure this is a Client Component

import React from 'react';
import { Portfolio, MetricsData } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PortfolioItemCardProps {
  portfolio: Portfolio;
  metrics?: {
    tokenUsage: string;
    successRate: string;
    cost: string;
  } | null;
}

export const PortfolioItemCard: React.FC<PortfolioItemCardProps> = ({ portfolio, metrics }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle>{portfolio.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Basic Portfolio Info */}
        <div>
          <p className="text-gray-600">{portfolio.description}</p>
          {portfolio.status && (
            <Badge variant="outline" className="mt-2">{portfolio.status}</Badge>
          )}
        </div>

        {/* Display Projects if available */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <div className="mt-2">
            <span className="font-medium">Projects:</span>
            {portfolio.projects.map(project => (
              <div key={project.id} className="ml-4 mt-1">
                <p>{project.title}</p>
                {/* Display Missions within the project */}
                {project.missions && project.missions.length > 0 && (
                  <div className="ml-4 text-sm text-gray-600">
                    <span className="font-medium">Missions:</span> {project.missions.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Display Metrics if available */}
        {metrics && (
          <div className="mt-4 space-y-2">
            <div>
              <span className="font-medium">Token Usage:</span> {metrics.tokenUsage}
            </div>
            <div>
              <span className="font-medium">Success Rate:</span> {metrics.successRate}
            </div>
            <div>
              <span className="font-medium">Cost:</span> ${metrics.cost}
            </div>
          </div>
        )}

        {/* Display Progress if available */}
        {portfolio.progress !== undefined && (
          <div className="mt-2">
            <span className="font-medium">Progress:</span> {portfolio.progress}%
          </div>
        )}

        {/* Display Domain if available */}
        {portfolio.domainId && (
          <div className="mt-2">
            <span className="font-medium">Domain ID:</span> {portfolio.domainId}
          </div>
        )}

        {/* Created Date */}
        <div className="mt-4 text-sm text-gray-500">
          Created: {new Date(portfolio.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioItemCard; 