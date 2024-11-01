import React from 'react';
import { Agent, MetricsData } from '@/types/portfolio';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAgentImage } from '@/mvp/utils/imageMapping';

interface PortfolioCardProps {
  agent: Agent;
  onClick?: () => void;
  showMetrics?: boolean;
}

const MetricsDisplay = ({ metrics }: { metrics?: MetricsData }) => {
  if (!metrics) return null;

  return (
    <div className="mt-4 space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Success Rate:</span>
        <Badge variant={metrics.successRate > 0.8 ? "default" : "secondary"}>
          {(metrics.successRate * 100).toFixed(1)}%
        </Badge>
      </div>
      <div className="flex justify-between">
        <span>Token Usage:</span>
        <span>{metrics.tokenUsage.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Cost/Execution:</span>
        <span>${metrics.costPerExecution.toFixed(4)}</span>
      </div>
    </div>
  );
};

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ 
  agent, 
  onClick,
  showMetrics = false
}) => {
  const imageSrc = getAgentImage(agent.domainId, agent.role);

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
      role="article"
    >
      <CardHeader className="relative h-48 p-0">
        <Image
          src={imageSrc}
          alt={agent.role}
          fill
          className="object-cover rounded-t-lg"
          priority={true}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/agents_images/sailor.png';
          }}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{agent.title}</CardTitle>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">{agent.role}</p>
          {agent.goal && (
            <p className="text-sm text-gray-500">{agent.goal}</p>
          )}
          {agent.tools && agent.tools.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {agent.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          )}
          {showMetrics && agent.metrics && (
            <MetricsDisplay metrics={agent.metrics} />
          )}
          {agent.performanceRating && (
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600 mr-2">Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-4 w-4 ${
                      star <= agent.performanceRating! 
                        ? "text-yellow-400" 
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
