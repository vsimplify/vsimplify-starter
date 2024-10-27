import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

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

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] bg-gray-100 overflow-hidden">
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} mode="wait">
          {FEATURES.map((feature, index) => (
            currentSlide === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  layout="fill"
                  objectFit="cover"
                  sizes="100vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 flex flex-col items-center justify-end p-4 sm:p-6 lg:p-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-center text-white">{feature.title}</h2>
                  <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-center max-w-2xl text-white">{feature.description}</p>
                  {feature.theme === 'empowerment' && (
                    <div className="flex items-center space-x-3 mb-4">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xl sm:text-2xl font-semibold">Boost Your Productivity</span>
                    </div>
                  )}
                  {feature.theme === 'applications' && (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                        </svg>
                        <span>Healthcare</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>Finance</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span>Education</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Controls - Positioned absolutely at the bottom */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 px-2 sm:px-4 py-1 sm:py-2 rounded-full">
          <button
            onClick={prevSlide}
            className="p-1 sm:p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={togglePause}
            className="p-1 sm:p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-white"
            aria-label="Toggle pause"
          >
            {isPaused ? <Play className="w-4 h-4 sm:w-5 sm:h-5" /> : <Pause className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button
            onClick={nextSlide}
            className="p-1 sm:p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span className="text-xs sm:text-sm font-semibold text-white">
            {currentSlide + 1} / {FEATURES.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;
