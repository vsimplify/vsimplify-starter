import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Home from "@/components/home/home-page";
import PlatformOverview from "@/components/home/platform-overview";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/overview");
  }

  return (
    <div className="flex flex-col items-center bg-background text-text">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4 max-w-6xl w-full">
        <Home />
      </div>
      <PlatformOverview />
    </div>
  );
}
