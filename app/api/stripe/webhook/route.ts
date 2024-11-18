import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supportUsPriceId = process.env.STRIPE_PRICE_ID_SUPPORT_US as string;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-08-16",
  typescript: true,
});

// Helper function to convert stream to string
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
    console.log("Webhook received");
    const headersObj = headers();
    const sig = headersObj.get("stripe-signature");

    if (!sig) {
      console.error("Missing stripe-signature");
      return NextResponse.json(
        {
          message: `Missing stripe-signature`,
        },
        { status: 400 }
      );
    }

    if (!endpointSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return NextResponse.json(
        {
          message: `Missing webhook secret`,
        },
        { status: 400 }
      );
    }

    if (!request.body) {
      console.error("Missing request body");
      return NextResponse.json(
        {
          message: `Missing body`,
        },
        { status: 400 }
      );
    }

    const rawBody = await streamToString(request.body);
    console.log("Raw body received");

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
      console.log("Webhook verified, event type:", event.type);
    } catch (err) {
      const error = err as Error;
      console.error("Error verifying webhook signature:", error.message);
      return NextResponse.json(
        {
          message: `Webhook Error: ${error?.message}`,
        },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data
          .object as Stripe.Checkout.Session;
        console.log("Processing completed checkout session:", checkoutSessionCompleted.id);
        
        // Verify this is a donation payment
        const lineItems = await stripe.checkout.sessions.listLineItems(
          checkoutSessionCompleted.id
        );
        const priceId = lineItems.data[0].price?.id;

        if (priceId !== supportUsPriceId) {
          console.error("Unhandled price ID:", priceId);
          return NextResponse.json(
            {
              message: "Unhandled price ID",
            },
            { status: 400 }
          );
        }

        console.log("Donation payment processed successfully");
        return NextResponse.json(
          {
            message: "success",
          },
          { status: 200 }
        );

      default:
        console.log("Unhandled event type:", event.type);
        return NextResponse.json(
          {
            message: `Unhandled event type ${event.type}`,
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
