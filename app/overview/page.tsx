'use client';

import { useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/lib/database.types';
import Dashboard from '@/components/dashboard/Dashboard';
import { CascadingFilter } from '@/components/ui/CascadingFilter';

export const dynamic = "force-dynamic";

// Pre-defined options
const forUseOptions = [
  { id: '1', name: 'Personal' },
  { id: '2', name: 'Business' },
  { id: '3', name: 'Education' }
];

const audienceOptionsMap = {
  '1': [
    { id: 'a1', name: 'Students' },
    { id: 'a2', name: 'Professionals' }
  ],
  '2': [
    { id: 'a3', name: 'Enterprises' },
    { id: 'a4', name: 'Startups' }
  ],
  '3': [
    { id: 'a5', name: 'Teachers' },
    { id: 'a6', name: 'Institutions' }
  ]
};

const domainOptionsMap = {
  'a1': [{ id: 'd1', name: 'Technology' }],
  'a2': [{ id: 'd2', name: 'Healthcare' }],
  'a3': [{ id: 'd3', name: 'Finance' }],
  'a4': [{ id: 'd4', name: 'Marketing' }],
  'a5': [{ id: 'd5', name: 'Education' }],
  'a6': [{ id: 'd6', name: 'Research' }]
};

const areaOptionsMap = {
  'd1': [{ id: 'ar1', name: 'Web Development' }],
  'd2': [{ id: 'ar2', name: 'Healthcare IT' }],
  'd3': [{ id: 'ar3', name: 'Fintech' }],
  'd4': [{ id: 'ar4', name: 'Digital Marketing' }],
  'd5': [{ id: 'ar5', name: 'EdTech' }],
  'd6': [{ id: 'ar6', name: 'Data Science' }]
};

export default function OverviewPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Memoized callback functions
  const getAudienceOptions = useCallback((forUse: string) => {
    return audienceOptionsMap[forUse as keyof typeof audienceOptionsMap] || [];
  }, []);

  const getDomainOptions = useCallback((audience: string) => {
    return domainOptionsMap[audience as keyof typeof domainOptionsMap] || [];
  }, []);

  const getAreaOptions = useCallback((domain: string) => {
    return areaOptionsMap[domain as keyof typeof areaOptionsMap] || [];
  }, []);

  const handleFilterChange = useCallback((domainId: string | null) => {
    setSelectedDomain(domainId);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <CascadingFilter
          forUseOptions={forUseOptions}
          getAudienceOptions={getAudienceOptions}
          getDomainOptions={getDomainOptions}
          getAreaOptions={getAreaOptions}
          onFilterChange={handleFilterChange}
          className="mb-8"
        />
        
        <main className="container mx-auto px-4 py-8">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
