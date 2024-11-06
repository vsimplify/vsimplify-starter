'use client';

import { Portfolio } from "@/types/portfolio";
import { Accordion } from "@/components/ui/accordion";

type PortfolioAccordionProps = {
  portfolios: Portfolio[];
  expandedPortfolios: string[];
  togglePortfolio: (id: string) => void;
};

export function PortfolioAccordion({ portfolios, expandedPortfolios, togglePortfolio }: PortfolioAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="mb-4">
          <h3 className="text-lg font-semibold">{portfolio.title}</h3>
          <p className="text-gray-600">{portfolio.description}</p>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {portfolio.focus_area}
            </span>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded ml-2">
              {portfolio.initiative}
            </span>
          </div>
        </div>
      ))}
    </Accordion>
  );
} 