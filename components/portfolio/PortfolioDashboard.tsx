'use client';

import React from "react";
import { Project } from "@/types/portfolio";
import { motion } from "framer-motion";

interface PortfolioDashboardProps {
  projects: Project[];
}

const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ projects }) => {
  return (
    <motion.div
      className="overflow-x-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Progress</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{project.id}</td>
              <td className="px-6 py-4">{project.title}</td>
              <td className="px-6 py-4">{project.description}</td>
              <td className="px-6 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm">{project.progress}%</span>
              </td>
              <td className="px-6 py-4">{project.status}</td>
              <td className="px-6 py-4">
                <button className="text-blue-500 hover:underline">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default PortfolioDashboard;