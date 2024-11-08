import { Suspense } from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from '@/components/dashboard/Dashboard';
import Image from 'next/image';

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return redirect("/overview");
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    // Continue rendering the page even if user fetch fails
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/QuickForAnswer_Logo.svg"
              alt="QuickForAnswer Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-white text-xl font-bold">QuickForAnswer</span>
          </div>
          <Image
            src="/vsitLogo.png"
            alt="VSIT Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <Dashboard />
        </Suspense>
      </main>
    </div>
  );
}
