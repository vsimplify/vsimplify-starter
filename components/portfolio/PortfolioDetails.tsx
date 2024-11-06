'use client';

import { Portfolio } from "@/types/portfolio";
import { PortfolioHeader } from "./PortfolioHeader";
import { PortfolioMetrics } from "./PortfolioMetrics";
import { ProjectList } from "./ProjectList";

type PortfolioDetailsProps = {
  portfolio: Portfolio;
};

export default function PortfolioDetails({ portfolio }: PortfolioDetailsProps) {
  const projects = portfolio.projects || [];

  return (
    <div className="space-y-6">
      <PortfolioHeader portfolio={portfolio} />
      <PortfolioMetrics portfolio={portfolio} />
      <ProjectList projects={projects} portfolioId={portfolio.id} />
    </div>
  );
} 