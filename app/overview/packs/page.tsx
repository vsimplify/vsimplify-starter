"use client"
import { useState, useEffect } from "react";
import { CascadingFilter, FilterOption } from "@/components/ui/CascadingFilter";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { domainData as mvpDomainData } from "@/data/domainData";
import { domainData as prodDomainData } from "@/data/domainData-PROD";

// Configuration
const CONFIG = {
  environment: "MVP" // Change to "PROD" for production environment
};

interface AgentImage {
  path: string;
  title: string;
  domain: string;
}

// MVP Agent Images
const mvpAgentImages: AgentImage[] = [
  { path: "/agents_images/1.01-Home-Parents-HomeManagement/1.01_General Home Advisor.jpeg", title: "Home Manager", domain: "Home Management 🏕" },
  { path: "/1.02-Home-Parents-Education/1.02-Household Tasks.png", title: "Household Task Master", domain: "Education 🏫" },
  { path: "/agents_images/1.03-Home-Parents-Budgeting/1.03_Study_Planning _Advisor.png", title: "Home Manager", domain: "Budgeting 💶" },
  { path: "/103.01-Work-Individual-Education-Digital Services/103.01_Productivity_Booster.png", title: "Household Task Master", domain: "Education 🏫" },
];

// Production Agent Images
const prodAgentImages: AgentImage[] = [
  { path: "/agents_images/103.01/103.01_Project Manager.png", title: "Project Manager", domain: "Digital Services 🌐" },
  { path: "/agents_images/100.01/100.01_Chief Medical Officer.png", title: "Chief Medical Officer", domain: "Medical Services 👨‍⚕️" },
  { path: "/agents_images/101.01/101.01_Chief Medical Scientist.gif", title: "Investment Analyst", domain: "Financial Services 💹" },
  { path: "/agents_images/103.02/103.02_Cybersecurity Analyst.png", title: "Security Specialist", domain: "Digital Services 🌐" },
];

const PackPage = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [filteredImages, setFilteredImages] = useState<AgentImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Select domain data and agent images based on configuration
  const domainData = CONFIG.environment === "MVP" ? mvpDomainData : prodDomainData;
  const agentImages = CONFIG.environment === "MVP" ? mvpAgentImages : prodAgentImages;

  // Filter option functions
  const getForUseOptions = (): FilterOption[] => {
    const uniqueForUse = Array.from(new Set(domainData.map(d => d.ForUse)));
    return uniqueForUse.map(use => ({ id: use, name: use }));
  };

  const getAudienceOptions = (forUse: string): FilterOption[] => {
    const filtered = domainData.filter(d => d.ForUse === forUse);
    const uniqueAudiences = Array.from(new Set(filtered.map(d => d.Audience)));
    return uniqueAudiences.map(audience => ({ id: audience, name: audience }));
  };

  const getDomainOptions = (audience: string): FilterOption[] => {
    const filtered = domainData.filter(d => d.Audience === audience);
    const uniqueDomains = Array.from(new Set(filtered.map(d => d.Domain)));
    return uniqueDomains.map(domain => ({ id: domain, name: domain }));
  };

  const getAreaOptions = (domain: string): FilterOption[] => {
    const filtered = domainData.filter(d => d.Domain === domain);
    return filtered.map(d => ({ id: d.Area, name: d.Area }));
  };

  useEffect(() => {
    const filtered = selectedDomain
      ? agentImages.filter((image) => image.domain === selectedDomain)
      : agentImages;
    setFilteredImages(filtered);
    setCurrentIndex(0); // Reset index when filters change
  }, [selectedDomain, agentImages]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPlaying && filteredImages.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, filteredImages.length]);

  const handleDomainChange = (domain: string | null) => {
    setSelectedDomain(domain);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-3">AI Agent Packs</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover our powerful AI Agents designed to assist you in executing your activities efficiently. 
          These specialized agents serve as intelligent resources, offering expertise across various domains 
          to help you achieve your goals.
        </p>
      </div>
      
      <CascadingFilter
        forUseOptions={getForUseOptions()}
        getAudienceOptions={getAudienceOptions}
        getDomainOptions={getDomainOptions}
        getAreaOptions={getAreaOptions}
        onFilterChange={handleDomainChange}
        className="mb-6"
      />
      
      <div className="relative mt-4 bg-gray-50 rounded-xl shadow-lg overflow-hidden">
        {filteredImages.length > 0 ? (
          <>
            <div className="relative aspect-video">
              <Image
                src={filteredImages[currentIndex].path}
                alt={filteredImages[currentIndex].title}
                layout="fill"
                objectFit="contain"
                className="rounded-t-xl"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-t from-black/70 to-transparent">
              <Button 
                variant="default"
                onClick={handlePrev}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Previous
              </Button>
              <Button 
                variant="default"
                onClick={togglePlayPause}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 mx-2"
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button 
                variant="default"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Next
              </Button>
            </div>
            <div className="p-4 bg-white rounded-b-xl">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredImages[currentIndex].title}
              </h2>
              <p className="text-blue-600 font-medium">
                {filteredImages[currentIndex].domain}
              </p>
            </div>
            <div className="flex justify-center py-3 bg-white border-t border-gray-100">
              {filteredImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full mx-1 transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-blue-600 w-4" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-lg text-gray-600 text-center">
              No AI agents available for the selected domain.
              Please adjust your filters to explore other domains.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackPage;
