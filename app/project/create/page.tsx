import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { CreateProjectForm } from "@/components/project";

export const revalidate = 0;

export default async function CreateProjectPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all domains and portfolios for the dropdowns
  const [{ data: domains }, { data: portfolios }] = await Promise.all([
    supabase.from("Domain").select("*").order('id'),
    supabase.from("portfolios").select("id, title").order('title')
  ]);

  if (!domains || !portfolios) {
    return <div>Failed to load required data.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Project</h1>
      <CreateProjectForm 
        domains={domains} 
        portfolios={portfolios}
        userId={user.id} 
      />
    </div>
  );
} 