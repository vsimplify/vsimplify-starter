"use client";
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
  }, [selectedDomain, agentImages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && filteredImages.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, filteredImages]);

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
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">AI Agent Packs</h1>
        <p className="text-gray-600">Environment: {CONFIG.environment}</p>
      </div>
      
      <CascadingFilter
        forUseOptions={getForUseOptions()}
        getAudienceOptions={getAudienceOptions}
        getDomainOptions={getDomainOptions}
        getAreaOptions={getAreaOptions}
        onFilterChange={handleDomainChange}
        className="mb-4"
      />
      
      <div className="relative mt-4">
        {filteredImages.length > 0 ? (
          <>
            <div className="relative aspect-video">
              <Image
                src={filteredImages[currentIndex].path}
                alt={filteredImages[currentIndex].title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-2 bg-black bg-opacity-50 rounded-b-lg">
              <Button variant="outline" onClick={handlePrev}>Previous</Button>
              <Button variant="outline" onClick={togglePlayPause}>
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button variant="outline" onClick={handleNext}>Next</Button>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{filteredImages[currentIndex].title}</h2>
              <p className="text-gray-600">{filteredImages[currentIndex].domain}</p>
            </div>
            <div className="flex justify-center mt-2">
              {filteredImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center py-8">No images available for the selected domain.</p>
        )}
      </div>
    </div>
  );
};

export default PackPage;
