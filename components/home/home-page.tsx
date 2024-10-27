'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, ChevronLeft, User, LogIn, UserPlus } from 'lucide-react';
import FeatureSlider from '@/components/home/FeatureSlider';

const DATA = [
  { image: '/img/homepage/quickforanswer_background_1.jpeg', title: '', desc: '' },
  { image: '/img/homepage/quickforanswer_background_0.jpeg', title: '', desc: '' },
  { image: '/img/homepage/quickforanswer_background_2.jpeg', title: '', desc: '' },
  { image: '/img/homepage/making_customers_go_above_&_beyond.jpeg', title: '', desc: '' }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFeatureSlider, setShowFeatureSlider] = useState(false);
  const [timer, setTimer] = useState(23);
  const [showTimer, setShowTimer] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % DATA.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + DATA.length) % DATA.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0 && !showFeatureSlider) {
        setTimer(timer - 1);
      } else if (timer === 0 && !showFeatureSlider) {
        setShowFeatureSlider(true);
        setShowTimer(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, showFeatureSlider]);

  useEffect(() => {
    let slideInterval: NodeJS.Timeout;

    if (!showFeatureSlider) {
      slideInterval = setInterval(nextSlide, 5000);
    }

    return () => clearInterval(slideInterval);
  }, [showFeatureSlider, nextSlide]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUsecasesClick = () => {
    if (showFeatureSlider) {
      setShowFeatureSlider(false);
      setCurrentSlide(0);
      setTimer(23);
      setShowTimer(true);
    } else {
      setShowFeatureSlider(true);
      setShowTimer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 flex flex-col h-screen">

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 text-center"
        >
          Your Ultimate AI Partner. A cutting-edge platform empowering you to use AI for any Project, allowing you to leverage Agents to maximize your IT potential.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6 flex justify-center"
        >
          <button
            onClick={handleUsecasesClick}
            className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showFeatureSlider ? "Start Again" : "Explore Usecases"}
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
        {showTimer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-blue-400 mb-6 text-center"
          >
            <span className="text-xl font-bold">{timer}</span>
            <span className="ml-2">seconds until showcase</span>
          </motion.div>
        )}
        <div className="flex-grow relative rounded-lg overflow-hidden shadow-2xl mb-6">
          <AnimatePresence mode="wait">
            {!showFeatureSlider ? (
              <motion.div
                key="main-slideshow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
              >
                <Image
                  src={DATA[currentSlide].image}
                  alt={`Slide ${currentSlide + 1}`}
                  width={1920}
                  height={1080}
                  objectFit="cover"
                  className="w-full h-full"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={prevSlide}
                    className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="feature-slider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <FeatureSlider />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm mb-4">
            First in a series of launches by VsimplifyIT. Early adopters, share what you would use Quick for!
          </p>
          <Link href="/platform-overview" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <span className="mr-2">Learn More</span>
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}