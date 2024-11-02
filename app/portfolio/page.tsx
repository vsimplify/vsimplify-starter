'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { Portfolio, convertToPortfolio } from '@/types/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import NavigationMenu from '@/components/NavigationMenu';
import { PortfolioList } from '@/components/portfolio/PortfolioList';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useImagePreloader } from '@/mvp/utils/imagePreloader';

export default function PortfolioPage() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [selectedDomainId] = React.useState<string>("103.01"); // Pre-selected for Game Development

  // Preload images for the selected domain
  const preloadStats = useImagePreloader(selectedDomainId);

  // Fetch portfolio data
  const { data: portfolioData, isLoading, error } = useQuery({
    queryKey: ['portfolio', selectedDomainId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolios')
        .select(`
          *,
          project:Project(
            *,
            missions:Mission(
              *,
              _AgentToMission(
                A,
                B
              )
            )
          )
        `)
        .eq('domainId', selectedDomainId)
        .single();

      if (error) throw error;
      return data ? convertToPortfolio(data) : null;
    }
  });

  const portfolio = portfolioData || null;

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

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error loading portfolios</h3>
          <p className="text-red-600 mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Button variant="ghost" size="lg" disabled>
          Loading portfolios...
        </Button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="p-4 space-y-6"
      >
        <NavigationMenu />
        
        <motion.div
          variants={containerVariants}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <motion.h1 
              variants={itemVariants}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
            >
              Game Development Portfolio
            </motion.h1>
            
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={() => router.push('/portfolio/create')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Create Portfolio
              </motion.button>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <PortfolioList 
              portfolio={portfolio}
              selectedDomainId={selectedDomainId}
            />
          </motion.div>

          {preloadStats.total > 0 && (
            <motion.div 
              variants={itemVariants}
              className="text-sm text-gray-500 flex items-center gap-2"
            >
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(preloadStats.loaded / preloadStats.total) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span>
                Images: {preloadStats.loaded}/{preloadStats.total}
                {preloadStats.failed > 0 && (
                  <span className="text-red-500 ml-2">
                    ({preloadStats.failed} failed)
                  </span>
                )}
              </span>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </ErrorBoundary>
  );
}

