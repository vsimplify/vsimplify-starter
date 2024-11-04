import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent } from '@/types/portfolio';
import AgentCard from '../portfolio/AgentCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface AgentSliderProps {
  agents: Agent[];
  itemsPerView?: number;
}

export const AgentSlider: React.FC<AgentSliderProps> = ({ 
  agents,
  itemsPerView = 3 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pages, setPages] = useState<Agent[][]>([]);

  // Split agents into pages
  useEffect(() => {
    const paginatedAgents = [];
    for (let i = 0; i < agents.length; i += itemsPerView) {
      paginatedAgents.push(agents.slice(i, i + itemsPerView));
    }
    setPages(paginatedAgents);
  }, [agents, itemsPerView]);

  const paginate = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < pages.length) {
      setCurrentIndex(newIndex);
    }
  };

  if (!pages.length) return null;

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex justify-between absolute top-1/2 w-full z-10 -mt-6 px-4">
        <button
          onClick={() => paginate(-1)}
          className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-50"
          disabled={currentIndex === 0}
          aria-label="Previous agents"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all disabled:opacity-50"
          disabled={currentIndex === pages.length - 1}
          aria-label="Next agents"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          className="grid grid-cols-3 gap-4 px-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          {pages[currentIndex].map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 gap-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-500 w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 