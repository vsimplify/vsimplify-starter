'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';

export interface FilterOption {
  id: string;
  name: string;
}

export interface CascadingFilterProps {
  forUseOptions: FilterOption[];
  getAudienceOptions: (forUse: string) => FilterOption[];
  getDomainOptions: (audience: string) => FilterOption[];
  getAreaOptions: (domain: string) => FilterOption[];
  onFilterChange: (domainId: string | null) => void;
  className?: string;
}

export const CascadingFilter: React.FC<CascadingFilterProps> = ({
  forUseOptions,
  getAudienceOptions,
  getDomainOptions,
  getAreaOptions,
  onFilterChange,
  className = '',
}) => {
  const [selectedForUse, setSelectedForUse] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const [audienceOptions, setAudienceOptions] = useState<FilterOption[]>([]);
  const [domainOptions, setDomainOptions] = useState<FilterOption[]>([]);
  const [areaOptions, setAreaOptions] = useState<FilterOption[]>([]);

  // Update audience options when forUse changes
  useEffect(() => {
    if (selectedForUse) {
      setAudienceOptions(getAudienceOptions(selectedForUse));
      setSelectedAudience(null);
      setSelectedDomain(null);
      setSelectedArea(null);
    } else {
      setAudienceOptions([]);
    }
  }, [selectedForUse, getAudienceOptions]);

  // Update domain options when audience changes
  useEffect(() => {
    if (selectedAudience) {
      setDomainOptions(getDomainOptions(selectedAudience));
      setSelectedDomain(null);
      setSelectedArea(null);
    } else {
      setDomainOptions([]);
    }
  }, [selectedAudience, getDomainOptions]);

  // Update area options when domain changes
  useEffect(() => {
    if (selectedDomain) {
      setAreaOptions(getAreaOptions(selectedDomain));
      setSelectedArea(null);
    } else {
      setAreaOptions([]);
    }
  }, [selectedDomain, getAreaOptions]);

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange(selectedDomain);
  }, [selectedDomain, onFilterChange]);

  const handleForUseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedForUse(e.target.value || null);
  };

  const handleAudienceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAudience(e.target.value || null);
  };

  const handleDomainChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomain(e.target.value || null);
  };

  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value || null);
  };

  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      <div>
        <label className="text-sm font-medium">For Use</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedForUse || ""}
          onChange={handleForUseChange}
        >
          <option value="">All Uses</option>
          {forUseOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Audience</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedAudience || ""}
          onChange={handleAudienceChange}
          disabled={!selectedForUse}
        >
          <option value="">All Audiences</option>
          {audienceOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Domain</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedDomain || ""}
          onChange={handleDomainChange}
          disabled={!selectedAudience}
        >
          <option value="">All Domains</option>
          {domainOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Area</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedArea || ""}
          onChange={handleAreaChange}
          disabled={!selectedDomain}
        >
          <option value="">All Areas</option>
          {areaOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
