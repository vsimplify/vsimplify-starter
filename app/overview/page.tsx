"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
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
    queryFn: async (): Promise<Project[] | []> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("Project")
        .select(`*, activities ( * ), agents ( * )`)
        .eq("user_id", user.id);
      if (error) throw error;
      
      return data.map((project: any) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        progress: project.progress,
        status: project.status,
        createdAt: project.created_at,
        domainId: project.domain_id,
        dueOn: project.due_on,
        email: project.email,
        goal: project.goal,
        nugget: project.nugget,
        objective: project.objective,
        outcome: project.outcome,
        updatedAt: project.updated_at,
        user_id: project.user_id,
        activities: project.activities,
        agents: project.agents,
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

      <PortfolioDashboard projects={projects ?? []} />
    </div>
  );
}
