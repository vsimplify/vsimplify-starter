'use client';

import React from "react";
import { Portfolio } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectList from "./ProjectList";
import MetricsChart from "./MetricsChart";

interface PortfolioDetailsProps {
  portfolio: Portfolio;
}

const PortfolioDetails: React.FC<PortfolioDetailsProps> = ({ portfolio }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{portfolio.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600">{portfolio.description}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectList projects={portfolio.projects} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricsChart portfolio={portfolio} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioDetails; 