// /app/support-us/DonationForm.tsx
'use client'

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { User } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface DonationFormProps {
  user: User;
}

export default function DonationForm({ user }: DonationFormProps) {
  const [amount, setAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to load Stripe');

      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          userId: user.id,
          userEmail: user.email,
          mode: 'support'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const { sessionId } = data;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Support Our Project</h1>
      
      <div className="space-y-4">
        <div> Follow #forAnswer on LinkedIn & Register to get notified of new updates 
          <a
            href="https://www.linkedin.com/feed/hashtag/?keywords=foranswer"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            LinkedIn
          </a>
        </div>
          {/* <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Donation Amount (units)
          </label>
          <input
            id="amount"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          /> */}
        </div>

        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

{/*         <button
          onClick={handleDonate}
          disabled={isLoading || amount < 1}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : `Donate $${amount}`}
        </button>
      </div> */}
    </div>
  );
}