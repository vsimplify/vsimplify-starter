'use client'

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Portfolio } from '@/types/portfolio';
import { useRouter } from 'next/navigation';
import PortfolioItemCard from './PortfolioItemCard';
import { getMetricsSummary } from '@/lib/metrics';

interface PortfolioListProps {
  portfolio: Portfolio | null;
  selectedDomainId: string;
}

type FilterOption = {
  value: string;
  label: string;
};

export const PortfolioList: React.FC<PortfolioListProps> = ({ portfolio, selectedDomainId }) => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [progressFilter, setProgressFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');

  // Filter options
  const statusOptions: FilterOption[] = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' }
  ];

  const progressOptions: FilterOption[] = [
    { value: 'all', label: 'All Progress' },
    { value: 'low', label: '0-33%' },
    { value: 'medium', label: '34-66%' },
    { value: 'high', label: '67-100%' }
  ];

  const sortOptions: FilterOption[] = [
    { value: 'title', label: 'Title' },
    { value: 'progress', label: 'Progress' },
    { value: 'projects', label: 'Project Count' }
  ];

  // Filter and sort portfolios
  const filteredPortfolio = useMemo(() => {
    if (!portfolio) return null;

    let filtered = portfolio;

    // Apply status filter
    if (statusFilter !== 'all' && filtered.status !== statusFilter) {
      return null;
    }

    // Apply progress filter
    if (progressFilter !== 'all') {
      const progress = filtered.progress || 0;
      switch (progressFilter) {
        case 'low':
          if (progress > 0.33) return null;
          break;
        case 'medium':
          if (progress <= 0.33 || progress > 0.66) return null;
          break;
        case 'high':
          if (progress <= 0.66) return null;
          break;
      }
    }

    return filtered;
  }, [portfolio, statusFilter, progressFilter]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const filterVariants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (!portfolio) {
    return (
      <div className="text-center text-gray-500">
        No portfolio found for the selected domain.
      </div>
    );
  }

  const metrics = getMetricsSummary(portfolio);

  return (
    <div className="space-y-4">
      {filteredPortfolio && (
        <PortfolioItemCard portfolio={filteredPortfolio} metrics={metrics} />
      )}
    </div>
  );
};
