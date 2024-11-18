import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const supportUsPriceId = process.env.STRIPE_PRICE_ID_SUPPORT_US;
const creditsPriceId = process.env.STRIPE_PRICE_ID_CREDITS;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!supportUsPriceId) {
  throw new Error("Missing STRIPE_PRICE_ID_SUPPORT_US");
}

if (!creditsPriceId) {
  throw new Error("Missing STRIPE_PRICE_ID_CREDITS");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-08-16",
  typescript: true,
});

// Helper function to get the site URL based on environment
const getSiteUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};

export async function POST(req: Request) {
  try {
    console.log("Creating checkout session...");
    const { amount, userId, userEmail, mode } = await req.json();

    if (!amount || !userId || !userEmail) {
      console.error("Missing required fields:", { amount, userId, userEmail });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isCreditsMode = mode === 'credits';
    const priceId = isCreditsMode ? creditsPriceId : supportUsPriceId;
    const returnPath = isCreditsMode ? 'get-credits' : 'support-us';

    const siteUrl = getSiteUrl();
    console.log("Using site URL:", siteUrl);

    console.log("Creating Stripe checkout session with params:", {
      amount,
      userId,
      userEmail,
      priceId,
      mode,
    });

    // Create checkout session based on mode
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: parseInt(amount),
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/${returnPath}?success=true`,
      cancel_url: `${siteUrl}/${returnPath}?success=false`,
      client_reference_id: userId,
      customer_email: userEmail,
      submit_type: isCreditsMode ? 'pay' : 'donate', // Use 'pay' for credits, 'donate' for support
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
