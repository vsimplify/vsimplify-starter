import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PortfolioDashboard from "@/components/portfolio/PortfolioDashboard";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <PortfolioDashboard userId={user.id} />;
}

