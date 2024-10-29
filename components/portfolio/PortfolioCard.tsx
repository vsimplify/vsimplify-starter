import React from 'react';
import type { Portfolio } from '@/types/portfolio';
import Link from 'next/link';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold">{portfolio.title}</h2>
      <p className="text-gray-600">{portfolio.description}</p>
      <div className="mt-2">
        <span className={`badge ${portfolio.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
          {portfolio.status}
        </span>
        <div className="mt-1">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${portfolio.progress}%` }}
            ></div>
          </div>
          <span>{portfolio.progress}% Complete</span>
        </div>
        {portfolio.project_id && (
          <Link 
            href={`/projects/${portfolio.project_id}`}
            className="text-blue-500 hover:text-blue-600 mt-2 block"
          >
            View Project Details
          </Link>
        )}
      </div>
    </div>
  );
};
