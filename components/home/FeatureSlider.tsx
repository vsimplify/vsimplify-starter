import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2, Minimize2 } from 'lucide-react';

const FEATURES = [
  { 
    image: '/img/usecases/ai_empowered_productivity_full.jpeg', 
    title: 'AI-Empowered Productivity', 
    description: 'Enhance your work with AI-powered tools',
    theme: 'empowerment'
  },
  { 
    image: '/img/usecases/ai_applications_full.jpeg', 
    title: 'AI Use Cases', 
    description: 'Explore diverse AI applications across industries',
    theme: 'applications'
  },
  { image: '/img/usecases/Financial_Analysis.jpeg', title: 'Financial Analysis', description: 'Analyze financial statements and market trends' },
  { image: '/img/usecases/HR-Goals.jpeg', title: 'HR Goals', description: 'Manage and track human resources objectives' },
  { image: '/img/usecases/Research_&_Monitor.jpeg', title: 'Research & Monitor', description: 'Conduct in-depth research and monitoring' },
  { image: '/img/usecases/Research_and_content_writing.jpeg', title: 'Content Writing', description: 'Generate and optimize content' },
  { image: '/img/usecases/TripPlanning.jpeg', title: 'Trip Planning', description: 'Plan and organize trips efficiently' },
  { image: '/img/usecases/SoftwareDevelopment.jpeg', title: 'Write Software', description: 'Identifies need in your target market, then transforms them to functional programs; you can tailor team members per specific outcomes.' },
  { image: '/img/usecases/Quick-For-Answer-Does-Everything.jpeg', title: 'Realize', description: 'Your Quick is Launching Soon. Will do anything for you, within the boundaries of Responsible AI!' },
];

const FeatureSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % FEATURES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
  }, []);

  const togglePause = useCallback(() => setIsPaused((prev) => !prev), []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const containerVariants = {
    compact: {
      height: "calc(100vh - 16rem)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    expanded: {
      height: "calc(100vh - 6rem)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full bg-gray-900 overflow-hidden rounded-lg mx-auto my-4"
      variants={containerVariants}
      initial="compact"
      animate={isExpanded ? "expanded" : "compact"}
    >
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} mode="wait">
          {FEATURES.map((feature, index) => (
            currentSlide === index && (
              <motion.div
                key={index}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col"
              >
                <div className="relative flex-1 overflow-hidden rounded-t-lg">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    layout="fill"
                    objectFit="contain"
                    className="transition-transform duration-300 ease-in-out"
                    priority={index === 0}
                  />
                </div>

                <motion.div 
                  className="bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent p-4 sm:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-white">
                    {feature.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-200 max-w-2xl">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            aria-label={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </motion.button>
        </div>

        {/* Bottom Controls Bar */}
        <motion.div 
          className="absolute bottom-0 inset-x-0 z-10 p-4 flex justify-between items-center bg-gradient-to-t from-gray-900 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePause}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Toggle pause"
            >
              {isPaused ? <Play size={20} /> : <Pause size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>

          <motion.div 
            className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            {currentSlide + 1} / {FEATURES.length}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureSlider;
