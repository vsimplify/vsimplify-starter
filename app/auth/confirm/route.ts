import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { isAuthApiError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (!tokenHash || !type) {
    console.error("Missing token_hash or type in Magic Link.");
    return NextResponse.redirect(
      new URL(`/login?error=Missing+token`, req.url)
    );
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token: tokenHash,
      type: type as "magiclink" | "signup" | "recovery" | "invite",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${next}`,
      },
    });

    if (error || !data.session) {
      console.error("Magic Link Verification Error:", error);
      return NextResponse.redirect(
        new URL(`/login?error=Invalid+token`, req.url)
      );
    }

    // Optionally, set additional cookies or handle post-login logic here

    return NextResponse.redirect(new URL(next, req.url));
  } catch (err) {
    if (isAuthApiError(err)) {
      console.error("Auth API Error during Magic Link verification:", err);
      return NextResponse.redirect(
        new URL(`/login?error=AuthApiError`, req.url)
      );
    } else {
      console.error("Unexpected Error during Magic Link verification:", err);
      return NextResponse.redirect(
        new URL(`/login?error=Authentication+failed`, req.url)
      );
    }
  }
}
