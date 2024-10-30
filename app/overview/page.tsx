"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/lib/database.types';
import { useQuery } from '@tanstack/react-query';
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";
import BrowseAIAgents from "@/components/BrowseAIAgents";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@material-tailwind/react";
import NavigationMenu from '@/components/NavigationMenu';
import { User } from '@supabase/supabase-js';
import { Project } from '@/types/portfolio';
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

const getErrorDetails = (error: any) => {
  if (error?.message) return error.message;
  if (error?.error_description) return error.error_description;
  if (typeof error === 'string') return error;
  return JSON.stringify(error, null, 2);
};

export default function OverviewPage() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [showBrowseAgents, setShowBrowseAgents] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Query for user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User | null> => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Auth error:', error);
        router.push('/login');
        return null;
      }
      return user;
    }
  });

  // Query for projects data with agent relationships
  const { data: projects, isLoading: projectsLoading, error } = useQuery({
    queryKey: ["projects", user?.id, selectedAgentId],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        // First fetch projects
        const { data: projectData, error: projectError } = await supabase
          .from("Project")
          .select("*")
          .eq("user_id", user.id)
          .throwOnError();

        if (projectError) throw projectError;
        if (!projectData) return [];

        // Fetch missions for these projects
        const { data: missionData, error: missionError } = await supabase
          .from("Mission")
          .select(`
            *,
            _AgentToMission!inner(
              A,
              B
            )
          `)
          .in(
            "projectId",
            projectData.map((project) => project.id)
          );

        if (missionError) throw missionError;

        // If an agent is selected, filter missions by agent
        const filteredMissions = selectedAgentId 
          ? missionData?.filter(mission => 
              mission._AgentToMission.some(relation => relation.A === selectedAgentId)
            )
          : missionData;

        // Map projects with their filtered missions
        return projectData.map((project: Database['public']['Tables']['Project']['Row']) => ({
          ...project,
          missions: filteredMissions?.filter((mission) => mission.projectId === project.id) || [],
          agents: [],
        })) as Project[];
      } catch (error) {
        console.error('Data fetch error:', error);
        throw error;
      }
    },
    enabled: !!user?.id
  });

  // Handle agent selection
  const handleAgentSelect = (agentId: number) => {
    setSelectedAgentId(agentId);
  };

  // Update filtered projects when projects or selectedAgentId changes
  useEffect(() => {
    if (!projects) return;
    
    if (selectedAgentId) {
      const filtered = projects.filter(project => 
        project.missions?.some(mission => 
          Array.isArray(mission._AgentToMission) && 
          mission._AgentToMission.some(relation => relation.A === selectedAgentId)
        ) ?? false
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [projects, selectedAgentId]);

  if (userLoading || projectsLoading) {
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
        <div className="text-red-500 max-w-md p-4">
          <p className="font-bold">Failed to load projects.</p>
          <p className="text-sm mt-2">{getErrorDetails(error)}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
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
        <div className="flex items-center gap-4">
          {selectedAgentId && (
            <Button
              color="gray"
              size="sm"
              onClick={() => setSelectedAgentId(null)}
            >
              Clear Filter
            </Button>
          )}
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
        </div>
      </motion.div>

      <AnimatePresence>
        {showBrowseAgents && user && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 overflow-hidden"
          >
            <BrowseAIAgents 
              userId={user.id} 
              onAgentSelect={handleAgentSelect}
              selectedAgentId={selectedAgentId}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <PortfolioDashboard projects={filteredProjects} />
    </div>
  );
}
