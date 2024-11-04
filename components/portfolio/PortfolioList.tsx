'use client';

import React from 'react';
import { Portfolio } from '@/types/portfolio';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DomainFilter, PortfolioItemCard } from "@/components/portfolio";
import { getMetricsSummary } from "@/lib/metrics";

interface PortfolioListProps {
  portfolios: Portfolio[];
  domains: {
    id: number;
    Domain: string;
    ForUse: string;
    Audience: string;
  }[];
}

export default function PortfolioList({ portfolios, domains }: PortfolioListProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolios</h1>
        <Link href="/portfolio/create">
          <Button>Create Portfolio</Button>
        </Link>
      </div>

      <div className="mb-6">
        <DomainFilter domains={domains} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
            <PortfolioItemCard
              portfolio={portfolio}
              metrics={getMetricsSummary(portfolio)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
