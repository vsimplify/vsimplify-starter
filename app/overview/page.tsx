"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/lib/database.types';
import { useQuery } from '@tanstack/react-query';
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";
import BrowseAIAgents from "@/components/BrowseAIAgents";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
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

  // Query for user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User | null> => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Auth error:', error);
        router.push('/login'); // Redirect to login if not authenticated
        return null;
      }
      return user;
    }
  });

  // Add this effect to check auth state
  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      const { data: { user } } = await supabase.auth.getUser();
      
      console.log('Auth Debug:', {
        hasSession: !!session,
        sessionUser: session?.user?.id,
        currentUser: user?.id,
        error: error?.message,
        accessToken: session?.access_token?.slice(0, 10) + '...',
      });
    };
    
    checkAuthState();
  }, []);

  // Query for projects data
  const { data: projects, isLoading: projectsLoading, error } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log('No user ID available');
        return [];
      }
      
      try {
        console.log('Fetching projects for user:', user.id);
        
        console.log('Auth check:', {
          authUid: user.id,
          format: typeof user.id
        });

        const { data: projectData, error: projectError } = await supabase
          .from("Project")
          .select("*")
          .eq("user_id", user.id)
          .throwOnError();

        console.log('Project query:', {
          userId: user.id,
          error: projectError,
          count: projectData?.length,
          firstProject: projectData?.[0]
        });

        if (projectError) {
          console.error('Project fetch error:', {
            error: projectError,
            message: projectError.message,
            details: projectError.details,
            hint: projectError.hint
          });
          throw projectError;
        }

        console.log('Projects fetched:', projectData?.length);

        if (!projectData) return [];

        const { data: missionData, error: missionError } = await supabase
          .from("Mission")
          .select("*")
          .in(
            "projectId",
            projectData.map((project) => project.id)
          );

        if (missionError) {
          console.error('Mission fetch error:', {
            error: missionError,
            details: getErrorDetails(missionError),
            code: missionError.code
          });
          throw missionError;
        }

        console.log('Missions fetched:', missionData?.length || 0);

        return projectData.map((project: Database['public']['Tables']['Project']['Row']) => ({
          ...project,
          missions: missionData?.filter((mission) => mission.projectId === project.id) || [],
          agents: [],
        })) as Project[];
      } catch (error) {
        console.error('Data fetch error:', {
          error,
          details: getErrorDetails(error),
          user: user.id,
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    },
    enabled: !!user?.id
  });

  // Handle loading states
  if (userLoading || projectsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Button variant="text" loading className="text-brown-700">
          Loading
        </Button>
      </div>
    );
  }

  // Handle error state with more details
  if (error) {
    console.error('Render error:', {
      error,
      details: getErrorDetails(error),
      user: user?.id
    });
    
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 max-w-md p-4">
          <p className="font-bold">Failed to load projects.</p>
          <p className="text-sm mt-2 whitespace-pre-wrap">
            {getErrorDetails(error)}
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="text-xs mt-4 bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  }

  // If no user, redirect to login
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

      {showBrowseAgents && user && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <BrowseAIAgents userId={user.id} />
        </motion.div>
      )}

      <PortfolioDashboard projects={projects || []} />
    </div>
  );
}
