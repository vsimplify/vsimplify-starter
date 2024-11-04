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
          <p className="text-sm text-gray-600">{portfolio.description}</p>
          {typeof portfolio.progress === 'number' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{portfolio.progress}%</span>
              </div>
              <Progress value={portfolio.progress} />
            </div>
          )}
          {/* Additional content */}
        </div>
      </CardContent>
    </Card>
  );
} 