'use client';

import React, { useState } from 'react';
import { Portfolio } from '@/types/portfolio';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DomainFilter } from "@/components/portfolio/DomainFilter";
import { PortfolioItemCard } from "@/components/portfolio/PortfolioItemCard";
import { getMetricsSummary } from "@/lib/metrics";

interface PortfolioListProps {
  Portfolio: Portfolio[];
  domains: {
    id: number;
    Domain: string;
    ForUse: string;
    Audience: string;
  }[];
}

export default function PortfolioList({ Portfolio, domains }: PortfolioListProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  
  // Transform domains to match the Domain type
  const formattedDomains = domains.map(domain => ({
    id: domain.id.toString(),
    name: domain.Domain,
    forUse: domain.ForUse,
    audience: domain.Audience
  }));

  const handleDomainChange = (domainId: string | null) => {
    setSelectedDomain(domainId || '');
  };

  // Filter Portfolio based on selected domain
  const filteredPortfolio = selectedDomain
    ? Portfolio.filter(portfolio => portfolio.domainId?.toString() === selectedDomain)
    : Portfolio;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Link href="/portfolio/create">
          <Button>Create Portfolio</Button>
        </Link>
      </div>

      <div className="mb-6">
        <DomainFilter 
          domains={formattedDomains}
          selectedDomain={selectedDomain}
          onDomainChange={handleDomainChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolio.map((portfolio) => (
          <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
            <PortfolioItemCard
              portfolio={portfolio}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
