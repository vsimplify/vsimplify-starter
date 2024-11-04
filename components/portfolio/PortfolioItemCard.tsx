'use client';

import React from 'react';
import { Portfolio } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";

interface PortfolioItemCardProps {
  portfolio: Portfolio;
  metrics?: {
    tokenUsage: string;
    successRate: string;
    cost: string;
  } | null;
}

export default function PortfolioItemCard({ portfolio, metrics }: PortfolioItemCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{portfolio.title}</span>
          {portfolio.status && (
            <Badge variant="outline">{portfolio.status}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Description */}
          <p className="text-sm text-gray-600">{portfolio.description}</p>

          {/* Progress */}
          {typeof portfolio.progress === 'number' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{portfolio.progress}%</span>
              </div>
              <Progress value={portfolio.progress} />
            </div>
          )}

          {/* Projects Summary */}
          {portfolio.projects && portfolio.projects.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Projects ({portfolio.projects.length})</p>
              <div className="grid grid-cols-2 gap-2">
                {portfolio.projects.slice(0, 4).map(project => (
                  <Badge key={project.id} variant="secondary" className="text-xs">
                    {project.title}
                  </Badge>
                ))}
                {portfolio.projects.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{portfolio.projects.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="space-y-1">
                <p className="text-gray-500">Token Usage</p>
                <p className="font-medium">{metrics.tokenUsage}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500">Success Rate</p>
                <p className="font-medium">{metrics.successRate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500">Cost</p>
                <p className="font-medium">${metrics.cost}</p>
              </div>
            </div>
          )}

          {/* Domain */}
          {portfolio.domainId && (
            <div className="text-sm text-gray-500">
              Domain ID: {portfolio.domainId}
            </div>
          )}

          {/* Created Date */}
          <div className="text-xs text-gray-400">
            Created: {new Date(portfolio.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 