"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/lib/database.types';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";
import BrowseAIAgents from "@/components/BrowseAIAgents";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import NavigationMenu from '@/components/NavigationMenu';
import { User } from '@supabase/supabase-js';
import { Project } from '@/types/portfolio';

export const dynamic = "force-dynamic";

export default function OverviewPage() {
  const supabase = createClientComponentClient<Database>();
  const [showBrowseAgents, setShowBrowseAgents] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User | null> => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    }
  });

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data: projectData, error: projectError } = await supabase
        .from("Project")
        .select("*")
        .eq("user_id", user.id);

      if (projectError) {
        throw projectError;
      }

      const { data: missionData, error: missionError } = await supabase
        .from("Mission")
        .select("*")
        .in(
          "projectId",
          projectData?.map((project) => project.id) || []
        );

      if (missionError) {
        throw missionError;
      }

      return projectData.map((project: Database['public']['Tables']['Project']['Row']) => ({
        ...project,
        missions: missionData.filter((mission) => mission.projectId === project.id),
        agents: [],
      })) as Project[];
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Button variant="text" loading className="text-brown-700">
          Loading
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Failed to load projects.</div>
        {error.message}
      </div>
    );
  }

  return (
    <div className="p-4">
      <NavigationMenu />
      <motion.div
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">AI Product Dashboard</h1>
        <button
          onClick={() => setShowBrowseAgents(!showBrowseAgents)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <span className="mr-2">Browse AI Agents</span>
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${
              showBrowseAgents ? "transform rotate-180" : ""
            }`}
          />
        </button>
      </motion.div>

      {showBrowseAgents && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <BrowseAIAgents />
        </motion.div>
      )}

      <PortfolioDashboard projects={projects || []} />
    </div>
  );
}
