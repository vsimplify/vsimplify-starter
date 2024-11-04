'use client';

import { useState } from "react";
import { Portfolio } from "@/types/portfolio";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DomainFilter, PortfolioItemCard } from "@/components/portfolio";
import { getMetricsSummary } from "@/lib/metrics";

interface PortfolioListProps {
  portfolios: Portfolio[];
  domains: Array<{
    id: number;
    Domain: string;
    ForUse: string;
    Audience: string;
  }>;
}

export function PortfolioList({ portfolios, domains }: PortfolioListProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Map database domains to the format expected by DomainFilter
  const formattedDomains = domains.map(domain => ({
    id: domain.id.toString(),
    name: domain.Domain
  }));

  // Filter portfolios based on selected domain
  const filteredPortfolios = selectedDomain
    ? portfolios.filter(portfolio => portfolio.domainId === selectedDomain)
    : portfolios;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Portfolios</h2>
        <Link href="/portfolio/create">
          <Button>Create Portfolio</Button>
        </Link>
      </div>

      <div className="mb-6">
        <DomainFilter 
          domains={formattedDomains}
          selectedDomain={selectedDomain}
          onDomainChange={setSelectedDomain}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolios.map((portfolio) => (
          <PortfolioItemCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>

      {filteredPortfolios.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No portfolios found</p>
        </div>
      )}
    </div>
  );
}
