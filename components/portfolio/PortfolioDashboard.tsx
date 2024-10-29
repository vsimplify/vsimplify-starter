'use client';

import React, { useState } from "react";
import { Domain } from "@/types/domain";
import { Project } from "@/types/project";
import { domainData } from "@/data/domainData";
import Select from "react-select";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface PortfolioDashboardProps {
  projects: Project[];
}

const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ projects }) => {
  const [filters, setFilters] = useState({
    forUse: "",
    audience: "",
    domain: "",
    area: "",
  });

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredProjects = projects.filter((project) => {
    const domain = domainData.find((d) => d.Id === project.domainId);
    if (!domain) return false;
    return (
      (filters.forUse ? domain.ForUse === filters.forUse : true) &&
      (filters.audience ? domain.Audience === filters.audience : true) &&
      (filters.domain ? domain.Domain === filters.domain : true) &&
      (filters.area ? domain.Area === filters.area : true)
    );
  });

  return (
    <div className="p-4">
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
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Project Name</th>
            <th className="py-2 px-4 border-b">Portfolio</th>
            <th className="py-2 px-4 border-b">Activities</th>
            <th className="py-2 px-4 border-b">Agents</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b">{project.name}</td>
              <td className="py-2 px-4 border-b">
                {domainData.find((d) => d.Id === project.domainId)?.ForUse || "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                {project.activities.map((activity) => activity.name).join(", ")}
              </td>
              <td className="py-2 px-4 border-b">
                {project.agents.map((agent) => agent.title).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioDashboard;