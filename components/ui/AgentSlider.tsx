import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent } from '@/types/portfolio';
import { PortfolioCard } from '../portfolio/PortfolioCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface AgentSliderProps {
  agents: Agent[];
  itemsPerView?: number;
}

export const AgentSlider: React.FC<AgentSliderProps> = ({ 
  agents,
  itemsPerView = 3 
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection * itemsPerView;
    if (newIndex >= 0 && newIndex < agents.length) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-between absolute top-1/2 w-full z-10 -mt-6">
        <button
          onClick={() => paginate(-1)}
          className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          disabled={currentIndex + itemsPerView >= agents.length}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div 
          className="flex gap-4 px-4"
          animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className="flex-none w-1/3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PortfolioCard agent={agent} showMetrics />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 