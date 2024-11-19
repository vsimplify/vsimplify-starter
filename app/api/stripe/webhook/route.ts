// /app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET");
}

if (!process.env.STRIPE_PRICE_ID_SUPPORT_US) {
  throw new Error("Missing STRIPE_PRICE_ID_SUPPORT_US");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
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
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { message: "Missing stripe-signature" },
        { status: 400 }
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { message: "Missing request body" },
        { status: 400 }
      );
    }

    const rawBody = await streamToString(request.body);
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      const error = err as Error;
      return NextResponse.json(
        { message: `Webhook signature verification failed: ${error.message}` },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Verify this is a donation payment
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0].price?.id;

      if (priceId === process.env.STRIPE_PRICE_ID_SUPPORT_US) {
        // Handle successful donation
        // Add your business logic here (e.g., update database, send email)
        return NextResponse.json({ message: "Donation processed successfully" });
      }
    }

    return NextResponse.json(
      { message: `Unhandled event type: ${event.type}` },
      { status: 400 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}