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
      scale: 0.95,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden rounded-lg">
      {/* Main Content Container */}
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
                {/* Image Container */}
                <div className="relative flex-1 overflow-hidden">
                  <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${isExpanded ? 'scale-100' : 'scale-95'}`}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className={`transition-all duration-300 ${isExpanded ? 'object-contain' : 'object-cover'}`}
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Text Overlay */}
                <motion.div 
                  className="relative z-10 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent p-4 sm:p-6"
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

        {/* Expand/Collapse Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg backdrop-blur-sm bg-opacity-80"
          aria-label={isExpanded ? "Minimize" : "Maximize"}
        >
          {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </motion.button>

        {/* Side Navigation Controls */}
        <div className="absolute inset-y-0 left-0 z-20 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="ml-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg backdrop-blur-sm bg-opacity-80"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 right-0 z-20 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="mr-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg backdrop-blur-sm bg-opacity-80"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 flex justify-center items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePause}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg backdrop-blur-sm bg-opacity-80"
            aria-label="Toggle pause"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </motion.button>

          <motion.div 
            className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm font-medium shadow-lg backdrop-blur-sm bg-opacity-80"
            whileHover={{ scale: 1.05 }}
          >
            {currentSlide + 1} / {FEATURES.length}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;
