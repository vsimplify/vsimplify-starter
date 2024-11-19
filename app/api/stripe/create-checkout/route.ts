// /app/api/stripe/create-checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const supportUsPriceId = process.env.STRIPE_PRICE_ID_SUPPORT_US;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!supportUsPriceId) {
  throw new Error("Missing STRIPE_PRICE_ID_SUPPORT_US");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-08-16",
  typescript: true,
});

const getSiteUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_URL}`
    : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
};

export async function POST(req: Request) {
  try {
    console.log("Creating checkout session...");
    const { amount, userId, userEmail } = await req.json();

    if (!amount || !userId || !userEmail) {
      console.error("Missing required fields:", { amount, userId, userEmail });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const siteUrl = getSiteUrl();
    console.log("Using site URL:", siteUrl);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price: supportUsPriceId,
        quantity: parseInt(amount),
      }],
      mode: "payment",
      success_url: `${siteUrl}/support-us?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/support-us?success=false`,
      client_reference_id: userId,
      customer_email: userEmail,
      submit_type: 'donate',
      metadata: {
        userId,
        donationType: 'support'
      }
    });

    console.log("Checkout session created:", session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error?.message || "Error creating checkout session" },
      { status: 500 }
    );
  }
}