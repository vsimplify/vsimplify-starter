'use client'

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Portfolio } from '@/types/portfolio';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Select, SelectOption } from '@/components/ui/select';

interface PortfolioListProps {
  portfolios: Portfolio[];
  selectedDomainId: string;
}

type FilterOption = {
  value: string;
  label: string;
};

export const PortfolioList: React.FC<PortfolioListProps> = ({ portfolios, selectedDomainId }) => {
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
  const filteredPortfolios = useMemo(() => {
    let filtered = [...portfolios];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    // Apply progress filter
    if (progressFilter !== 'all') {
      filtered = filtered.filter(p => {
        const progress = p.progress || 0;
        switch (progressFilter) {
          case 'low': return progress <= 0.33;
          case 'medium': return progress > 0.33 && progress <= 0.66;
          case 'high': return progress > 0.66;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        case 'projects':
          return (b.projects?.length || 0) - (a.projects?.length || 0);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [portfolios, statusFilter, progressFilter, sortBy]);

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

  const getMetricsSummary = (portfolio: Portfolio) => {
    if (!portfolio.metrics) return null;

    return {
      tokenUsage: portfolio.metrics.tokenUsage.toLocaleString(),
      successRate: (portfolio.metrics.successRate * 100).toFixed(1),
      cost: portfolio.metrics.costPerExecution.toFixed(4)
    };
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div 
        variants={filterVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-4"
      >
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={statusOptions}
          placeholder="Filter by Status"
        />
        <Select
          value={progressFilter}
          onValueChange={setProgressFilter}
          options={progressOptions}
          placeholder="Filter by Progress"
        />
        <Select
          value={sortBy}
          onValueChange={setSortBy}
          options={sortOptions}
          placeholder="Sort by"
        />
      </motion.div>

      {/* Portfolio List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        <AnimatePresence mode="wait">
          {filteredPortfolios.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <p className="text-gray-500">No portfolios found matching your filters.</p>
            </motion.div>
          ) : (
            filteredPortfolios.map((portfolio) => (
              <motion.div
                key={portfolio.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => router.push(`/portfolio/${portfolio.id}`)}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{portfolio.title}</h3>
                      <p className="text-gray-600">{portfolio.description}</p>
                      
                      {/* Project count */}
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {portfolio.projects?.length || 0} Projects
                        </Badge>
                        {portfolio.progress !== null && (
                          <div className="flex items-center gap-2">
                            <Progress value={portfolio.progress * 100} className="w-24" />
                            <span className="text-sm text-gray-500">
                              {(portfolio.progress * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                  </div>

                  {/* Metrics */}
                  {portfolio.metrics && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t"
                    >
                      <div>
                        <p className="text-sm text-gray-500">Token Usage</p>
                        <p className="text-lg font-medium">
                          {getMetricsSummary(portfolio)?.tokenUsage}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Success Rate</p>
                        <p className="text-lg font-medium">
                          {getMetricsSummary(portfolio)?.successRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cost/Execution</p>
                        <p className="text-lg font-medium">
                          ${getMetricsSummary(portfolio)?.cost}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="text-sm text-gray-500 flex justify-between"
      >
        <span>Total Portfolios: {portfolios.length}</span>
        <span>Filtered: {filteredPortfolios.length}</span>
      </motion.div>
    </div>
  );
};
