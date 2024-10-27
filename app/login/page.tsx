import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "../../types/supabase";
import Login from "@/app/login/components/Login"; // Correct import path with default export

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
        <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
            <Login host={host} />
        </div>
    );
}
