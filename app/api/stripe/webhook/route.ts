// /app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supportUsPriceId = process.env.STRIPE_PRICE_ID_SUPPORT_US;

// Early validation of required environment variables
if (!stripeSecretKey || !webhookSecret || !supportUsPriceId) {
  throw new Error(
    `Missing environment variables: ${[
      !stripeSecretKey && "STRIPE_SECRET_KEY",
      !webhookSecret && "STRIPE_WEBHOOK_SECRET",
      !supportUsPriceId && "STRIPE_PRICE_ID_SUPPORT_US",
    ]
      .filter(Boolean)
      .join(", ")}`
  );
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-08-16",
  typescript: true,
});

async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }
  
  return result;
}

export async function POST(request: Request) {
  try {
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature" },
        { status: 400 }
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { error: "Missing request body" },
        { status: 400 }
      );
    }

    const rawBody = await streamToString(request.body);
    
    let event: Stripe.Event;
    
    try {
      // webhookSecret is guaranteed to be string due to early validation
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret as string // Safe assertion due to early validation
      );
    } catch (err) {
      const error = err as Error;
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${error.message}` },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0].price?.id;

      if (priceId === supportUsPriceId) {
        // Add your business logic here
        return NextResponse.json({ message: "Payment processed successfully" });
      }
    }

    return NextResponse.json(
      { message: `Unhandled event type: ${event.type}` },
      { status: 400 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}