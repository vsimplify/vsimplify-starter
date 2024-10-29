import ClientSideModelsList from "@/components/realtime/ClientSideModelsList";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";
import { useState } from "react";
import BrowseAIAgents from "@/components/BrowseAIAgents";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const { data: projects } = await supabase
    .from("Project")
    .select(`*, activities ( * ), agents ( * )`)
    .eq("user_id", user.id);

  const [showBrowseAgents, setShowBrowseAgents] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => setShowBrowseAgents(!showBrowseAgents)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <span className="mr-2">Browse AI Agents</span>
          {/* Animated Chevron */}
          <ChevronDownIcon className={`h-5 w-5 transition-transform ${showBrowseAgents ? "transform rotate-180" : ""}`} />
        </button>
      </div>
      {showBrowseAgents && <BrowseAIAgents />}
      <PortfolioDashboard projects={projects ?? []} />
    </div>
  );
}
