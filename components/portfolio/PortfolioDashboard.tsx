'use client';

import { useState } from 'react';
import { Database } from '@/types/supabase';
import { Portfolio } from '@/types/portfolio';

type Domain = Database['public']['Tables']['Domain']['Row'];

export type PortfolioDashboardProps = {
  initialDomains: Domain[];
  initialPortfolios: Portfolio[];
  userId: string;
};

export default function PortfolioDashboard({ 
  initialDomains, 
  initialPortfolios, 
  userId 
}: PortfolioDashboardProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedForUse, setSelectedForUse] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        AI Portfolio Dashboard
      </h1>
      
      {/* Filter controls will go here */}
      
      {/* Portfolio cards will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPortfolios.map(portfolio => (
          <div key={portfolio.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{portfolio.title}</h2>
            <p className="text-gray-300">{portfolio.description}</p>
            {portfolio.projects && portfolio.projects.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400">Projects</h3>
                <ul className="mt-2 space-y-2">
                  {portfolio.projects.map(project => (
                    <li key={project.id} className="text-sm text-gray-300">
                      {project.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}