'use client';

import { useState } from 'react';
import { CascadingFilter } from '@/components/ui/CascadingFilter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

// Mock data for filters
const forUseOptions = [
  { id: 'research', name: 'Research' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'educational', name: 'Educational' }
];

const getAudienceOptions = (forUse: string) => {
  const options = {
    research: [
      { id: 'scientists', name: 'Scientists' },
      { id: 'researchers', name: 'Researchers' }
    ],
    commercial: [
      { id: 'businesses', name: 'Businesses' },
      { id: 'developers', name: 'Developers' }
    ],
    educational: [
      { id: 'students', name: 'Students' },
      { id: 'teachers', name: 'Teachers' }
    ]
  };
  return options[forUse as keyof typeof options] || [];
};

const getDomainOptions = (audience: string) => {
  const options = {
    scientists: [
      { id: 'ai', name: 'Artificial Intelligence' },
      { id: 'biotech', name: 'Biotechnology' }
    ],
    researchers: [
      { id: 'data-science', name: 'Data Science' },
      { id: 'quantum', name: 'Quantum Computing' }
    ],
    businesses: [
      { id: 'enterprise', name: 'Enterprise Solutions' },
      { id: 'saas', name: 'SaaS' }
    ],
    developers: [
      { id: 'web-dev', name: 'Web Development' },
      { id: 'mobile-dev', name: 'Mobile Development' }
    ],
    students: [
      { id: 'programming', name: 'Programming' },
      { id: 'machine-learning', name: 'Machine Learning' }
    ],
    teachers: [
      { id: 'curriculum', name: 'Curriculum Development' },
      { id: 'assessment', name: 'Assessment Tools' }
    ]
  };
  return options[audience as keyof typeof options] || [];
};

const getAreaOptions = (domain: string) => {
  const options = {
    'ai': [
      { id: 'nlp', name: 'Natural Language Processing' },
      { id: 'cv', name: 'Computer Vision' }
    ],
    'web-dev': [
      { id: 'frontend', name: 'Frontend Development' },
      { id: 'backend', name: 'Backend Development' }
    ]
  };
  return options[domain as keyof typeof options] || [];
};

// Mock portfolio data
const mockPortfolios = [
  {
    id: 1,
    title: 'AI Research Portfolio',
    description: 'Collection of AI research projects and experiments',
    status: 'active',
    progress: 75,
    projects: [
      { id: 1, title: 'Neural Networks' },
      { id: 2, title: 'Machine Learning' },
      { id: 3, title: 'Deep Learning' }
    ],
    domainId: 'ai',
    initiative: 'Research Excellence',
    created_at: new Date(2023, 0, 1).toISOString()
  },
  {
    id: 2,
    title: 'Web Development Portfolio',
    description: 'Enterprise web applications and services',
    status: 'in-progress',
    progress: 45,
    projects: [
      { id: 4, title: 'E-commerce Platform' },
      { id: 5, title: 'CMS System' }
    ],
    domainId: 'web-dev',
    initiative: 'Digital Transformation',
    created_at: new Date(2023, 1, 15).toISOString()
  }
];

export default function PortfolioPage() {
  const [filteredDomain, setFilteredDomain] = useState<string | null>(null);

  const handleFilterChange = (domainId: string | null) => {
    setFilteredDomain(domainId);
  };

  const displayedPortfolios = filteredDomain
    ? mockPortfolios.filter(p => p.domainId === filteredDomain)
    : mockPortfolios;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Portfolios</h1>
      
      <CascadingFilter
        forUseOptions={forUseOptions}
        getAudienceOptions={getAudienceOptions}
        getDomainOptions={getDomainOptions}
        getAreaOptions={getAreaOptions}
        onFilterChange={handleFilterChange}
        className="mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPortfolios.map((portfolio) => (
          <div key={portfolio.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{portfolio.title}</h2>
                <p className="text-gray-600 mb-4">{portfolio.description}</p>
              </div>
              <Badge variant={portfolio.status === 'active' ? 'default' : 'secondary'}>
                {portfolio.status}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium">{portfolio.progress}%</span>
              </div>
              <Progress value={portfolio.progress} />
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Projects</span>
              <span className="font-medium">{portfolio.projects.length}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {portfolio.projects.slice(0, 3).map((project) => (
                <Badge key={project.id} variant="outline" className="text-xs">
                  {project.title}
                </Badge>
              ))}
              {portfolio.projects.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{portfolio.projects.length - 3} more
                </Badge>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {portfolio.domainId && (
                <Badge variant="secondary" className="text-xs">
                  Domain: {portfolio.domainId}
                </Badge>
              )}
              {portfolio.initiative && (
                <Badge variant="secondary" className="text-xs">
                  {portfolio.initiative}
                </Badge>
              )}
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Created {formatDistanceToNow(new Date(portfolio.created_at), { addSuffix: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
