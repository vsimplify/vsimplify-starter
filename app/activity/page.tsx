'use client';

import { useState } from 'react';
import { CascadingFilter } from '@/components/ui/CascadingFilter';
import { Metadata } from 'next';

// Mock data for filters
const forUseOptions = [
  { id: 'automation', name: 'Automation' },
  { id: 'analysis', name: 'Analysis' },
  { id: 'monitoring', name: 'Monitoring' }
];

const getAudienceOptions = (forUse: string) => {
  const options = {
    automation: [
      { id: 'developers', name: 'Developers' },
      { id: 'operations', name: 'Operations' }
    ],
    analysis: [
      { id: 'data-analysts', name: 'Data Analysts' },
      { id: 'researchers', name: 'Researchers' }
    ],
    monitoring: [
      { id: 'system-admins', name: 'System Administrators' },
      { id: 'devops', name: 'DevOps Engineers' }
    ]
  };
  return options[forUse as keyof typeof options] || [];
};

const getDomainOptions = (audience: string) => {
  const options = {
    developers: [
      { id: 'ci-cd', name: 'CI/CD' },
      { id: 'testing', name: 'Testing' }
    ],
    'data-analysts': [
      { id: 'data-processing', name: 'Data Processing' },
      { id: 'visualization', name: 'Data Visualization' }
    ],
    'system-admins': [
      { id: 'infrastructure', name: 'Infrastructure' },
      { id: 'security', name: 'Security' }
    ]
  };
  return options[audience as keyof typeof options] || [];
};

const getAreaOptions = (domain: string) => {
  const options = {
    'ci-cd': [
      { id: 'deployment', name: 'Deployment' },
      { id: 'integration', name: 'Integration' }
    ],
    'data-processing': [
      { id: 'etl', name: 'ETL' },
      { id: 'analytics', name: 'Analytics' }
    ],
    infrastructure: [
      { id: 'cloud', name: 'Cloud Services' },
      { id: 'networking', name: 'Networking' }
    ]
  };
  return options[domain as keyof typeof options] || [];
};

export default function ActivityPage() {
  const [filteredDomain, setFilteredDomain] = useState<string | null>(null);

  const handleFilterChange = (domainId: string | null) => {
    setFilteredDomain(domainId);
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Activity Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your AI agents' activities and performance metrics</p>
        </header>

        <CascadingFilter
          forUseOptions={forUseOptions}
          getAudienceOptions={getAudienceOptions}
          getDomainOptions={getDomainOptions}
          getAreaOptions={getAreaOptions}
          onFilterChange={handleFilterChange}
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Activities</h3>
            <p className="text-2xl font-bold mt-1">1,284</p>
            <span className="text-green-600 text-sm">↑ 12% from last week</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Active Agents</h3>
            <p className="text-2xl font-bold mt-1">23</p>
            <span className="text-blue-600 text-sm">↑ 3 new today</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
            <p className="text-2xl font-bold mt-1">94.2%</p>
            <span className="text-green-600 text-sm">↑ 2.1% improvement</span>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Response Time</h3>
            <p className="text-2xl font-bold mt-1">1.2s</p>
            <span className="text-yellow-600 text-sm">← Stable</span>
          </div>
        </div>

        <section className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 border-b pb-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Image Processing Complete</h3>
                    <span className="text-sm text-gray-500">2 min ago</span>
                  </div>
                  <p className="text-gray-600">Agent processed 50 images with 98% accuracy</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 border-b pb-4">
                <div className="bg-green-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Model Training Completed</h3>
                    <span className="text-sm text-gray-500">15 min ago</span>
                  </div>
                  <p className="text-gray-600">NLP model training completed with 92% validation accuracy</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 rounded-full p-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">System Alert</h3>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-gray-600">High resource usage detected in Agent-7. Optimization recommended.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
