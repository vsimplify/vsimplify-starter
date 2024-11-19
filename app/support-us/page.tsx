// /app/support-us/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DonationForm from './DonationForm';

export const dynamic = "force-dynamic";

export default async function SupportUsPage() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  return (
    <DonationForm user={user} />
  );
}