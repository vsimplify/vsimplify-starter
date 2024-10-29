import React from "react";
import { agents } from "@/data/data";
import Select from "react-select";
import { domainData } from "@/data/domainData";
import { ChevronDownIcon } from "@heroicons/react/solid";

const BrowseAIAgents: React.FC = () => {
  const [filters, setFilters] = React.useState({
    forUse: "",
    audience: "",
    domain: "",
    area: "",
  });

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredAgents = agents.filter((agent) => {
    const domain = domainData.find((d) => d.Id === agent.domainId);
    if (!domain) return false;
    return (
      (filters.forUse ? domain.ForUse === filters.forUse : true) &&
      (filters.audience ? domain.Audience === filters.audience : true) &&
      (filters.domain ? domain.Domain === filters.domain : true) &&
      (filters.area ? domain.Area === filters.area : true)
    );
  });

  return (
    <div className="mt-4">
      <div className="flex space-x-4 mb-4">
        <Select
          options={[...new Set(domainData.map((d) => d.ForUse))].map((forUse) => ({
            label: forUse,
            value: forUse,
          }))}
          placeholder="Filter by Focus Area"
          onChange={(option) => handleFilterChange("forUse", option?.value || "")}
          className="w-1/4"
          components={{ DropdownIndicator: () => <ChevronDownIcon className="h-5 w-5 text-gray-400" /> }}
        />
        <Select
          options={[
            ...new Set(
              domainData
                .filter((d) => !filters.forUse || d.ForUse === filters.forUse)
                .map((d) => d.Audience)
            ),
          ].map((audience) => ({ label: audience, value: audience }))}
          placeholder="Filter by Audience"
          onChange={(option) => handleFilterChange("audience", option?.value || "")}
          className="w-1/4"
          isDisabled={!filters.forUse}
          components={{ DropdownIndicator: () => <ChevronDownIcon className="h-5 w-5 text-gray-400" /> }}
        />
        <Select
          options={[
            ...new Set(
              domainData
                .filter(
                  (d) =>
                    (!filters.forUse || d.ForUse === filters.forUse) &&
                    (!filters.audience || d.Audience === filters.audience)
                )
                .map((d) => d.Domain)
            ),
          ].map((domain) => ({ label: domain, value: domain }))}
          placeholder="Filter by Domain"
          onChange={(option) => handleFilterChange("domain", option?.value || "")}
          className="w-1/4"
          isDisabled={!filters.audience}
          components={{ DropdownIndicator: () => <ChevronDownIcon className="h-5 w-5 text-gray-400" /> }}
        />
        <Select
          options={[
            ...new Set(
              domainData
                .filter(
                  (d) =>
                    (!filters.forUse || d.ForUse === filters.forUse) &&
                    (!filters.audience || d.Audience === filters.audience) &&
                    (!filters.domain || d.Domain === filters.domain)
                )
                .map((d) => d.Area)
            ),
          ].map((area) => ({ label: area, value: area }))}
          placeholder="Filter by Area"
          onChange={(option) => handleFilterChange("area", option?.value || "")}
          className="w-1/4"
          isDisabled={!filters.domain}
          components={{ DropdownIndicator: () => <ChevronDownIcon className="h-5 w-5 text-gray-400" /> }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <div key={agent.email} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <img src={agent.image} alt={agent.title} className="w-full h-32 object-cover rounded-t-lg" />
            <h2 className="mt-2 text-xl font-semibold">{agent.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{agent.role}</p>
            <p className="mt-2 text-sm">{agent.backstory}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseAIAgents; 