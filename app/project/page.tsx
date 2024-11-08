'use client';

import { useState } from 'react';
import { CascadingFilter } from '@/components/ui/CascadingFilter';
import { Metadata } from 'next';

// Mock data for filters
const forUseOptions = [
  { id: 'research', name: 'Research' },
  { id: 'development', name: 'Development' },
  { id: 'production', name: 'Production' }
];

const getAudienceOptions = (forUse: string) => {
  const options = {
    research: [
      { id: 'data-scientists', name: 'Data Scientists' },
      { id: 'researchers', name: 'Researchers' }
    ],
    development: [
      { id: 'developers', name: 'Developers' },
      { id: 'testers', name: 'QA Engineers' }
    ],
    production: [
      { id: 'end-users', name: 'End Users' },
      { id: 'clients', name: 'Clients' }
    ]
  };
  return options[forUse as keyof typeof options] || [];
};

const getDomainOptions = (audience: string) => {
  const options = {
    'data-scientists': [
      { id: 'ml', name: 'Machine Learning' },
      { id: 'analytics', name: 'Analytics' }
    ],
    developers: [
      { id: 'frontend', name: 'Frontend' },
      { id: 'backend', name: 'Backend' }
    ],
    'end-users': [
      { id: 'web-apps', name: 'Web Applications' },
      { id: 'mobile-apps', name: 'Mobile Applications' }
    ]
  };
  return options[audience as keyof typeof options] || [];
};

const getAreaOptions = (domain: string) => {
  const options = {
    ml: [
      { id: 'nlp', name: 'Natural Language Processing' },
      { id: 'cv', name: 'Computer Vision' }
    ],
    frontend: [
      { id: 'react', name: 'React' },
      { id: 'vue', name: 'Vue' }
    ]
  };
  return options[domain as keyof typeof options] || [];
};

export default function ProjectPage() {
  const [filteredDomain, setFilteredDomain] = useState<string | null>(null);

  const handleFilterChange = (domainId: string | null) => {
    setFilteredDomain(domainId);
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-gray-600 mt-2">Track and manage your AI development projects</p>
        </header>

        <CascadingFilter
          forUseOptions={forUseOptions}
          getAudienceOptions={getAudienceOptions}
          getDomainOptions={getDomainOptions}
          getAreaOptions={getAreaOptions}
          onFilterChange={handleFilterChange}
          className="mb-8"
        />

        <div className="grid gap-6">
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">Active Projects</h3>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900">Completed</h3>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900">In Progress</h3>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Project Name</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Progress</th>
                    <th className="text-left py-3 px-4">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">AI Image Generator</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Active</span>
                    </td>
                    <td className="py-3 px-4">75%</td>
                    <td className="py-3 px-4">2 hours ago</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">NLP Model Training</td>
                    <td className="py-3 px-4">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">In Progress</span>
                    </td>
                    <td className="py-3 px-4">45%</td>
                    <td className="py-3 px-4">1 day ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
