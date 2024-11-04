import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import CreatePortfolioForm from "@/components/portfolio/CreatePortfolioForm";

export const revalidate = 0;

export default async function CreatePortfolioPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all domains for the dropdown
  const { data: domains, error: domainsError } = await supabase
    .from("Domain")
    .select("*")
    .order('id');

  if (domainsError) {
    console.error("Error fetching domains:", domainsError);
    return <div>Failed to load domains.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Portfolio</h1>
      <CreatePortfolioForm domains={domains} userId={user.id} />
    </div>
  );
} 