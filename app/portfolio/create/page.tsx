import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { CreatePortfolioForm } from "@/components/portfolio";

export const revalidate = 0;

export default async function CreatePortfolioPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch domains without the parent_id field
  const { data: domains, error: domainError } = await supabase
    .from("Domain")
    .select(`
      id,
      Domain,
      ForUse,
      Audience,
      Area,
      Agents,
      Missions,
      identifier,
      agentAbsent
    `)
    .order('Domain');

  if (domainError) {
    console.error("Error fetching domains:", domainError);
    return <div>Failed to load domain data.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create Portfolio</h1>
        <p className="text-muted-foreground mb-6">
          Create a new portfolio to organize your projects and initiatives
        </p>
        <CreatePortfolioForm
          domains={domains || []}
          userId={user.id}
        />
      </div>
    </div>
  );
} 