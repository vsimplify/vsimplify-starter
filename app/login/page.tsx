import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../types/supabase";
import Login from "@/app/login/components/Login";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/");
    }

    const headersList = headers();
    const host = headersList.get("host");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
            <div className="w-full max-w-md px-4">
                <Login host={host} />
            </div>
        </div>
    );
}
