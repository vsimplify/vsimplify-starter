'use client';

import { Button } from "@/components/ui/button";
import { Portfolio } from "@/types/portfolio";
import { Edit, Share2 } from "lucide-react";

type PortfolioHeaderProps = {
  portfolio: Portfolio;
};

export function PortfolioHeader({ portfolio }: PortfolioHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold">{portfolio.title}</h1>
        <p className="text-muted-foreground mt-2">{portfolio.description}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
} 