'use client';

import React from 'react';
import { Portfolio } from '@/types/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
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
        <p className="text-sm text-gray-600">{portfolio.description}</p>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
