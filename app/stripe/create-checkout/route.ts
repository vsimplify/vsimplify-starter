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

export async function POST(req: Request) {
  try {
    const { amount, userId, userEmail } = await req.json();

    if (!amount || !userId || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a checkout session for donation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: supportUsPriceId,
          quantity: amount,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-credits?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-credits?success=false`,
      client_reference_id: userId,
      customer_email: userEmail,
      submit_type: 'donate', // This changes the text on the submit button to "Donate"
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
