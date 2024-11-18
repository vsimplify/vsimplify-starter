'use client'
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

type Props = {
  user: User;
  mode?: 'credits' | 'support';
}

const StripePricingTable = ({ user, mode = 'support' }: Props) => {
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load Stripe.js
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Creating checkout session...');
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: quantity,
          userId: user.id,
          userEmail: user.email,
          mode: mode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Checkout session creation failed:', errorData);
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();
      console.log('Checkout session created:', data);
      
      if (!data.sessionId) {
        throw new Error('No session ID returned from server');
      }

      const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublicKey) {
        throw new Error('Stripe publishable key is not configured');
      }

      const stripe = (window as any).Stripe(stripePublicKey);
      
      console.log('Redirecting to checkout...');
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        setError(stripeError.message);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => mode === 'credits' ? 'Get Credits' : 'Support Our Project';
  const getDescription = () => mode === 'credits' 
    ? 'Purchase credits to continue using our services. Each credit allows you to make one request.'
    : 'Your support helps us continue developing and improving our services. Thank you for your generosity!';
  const getButtonText = () => mode === 'credits' ? 'Get Credits' : 'Support Now';
  const getLabel = () => mode === 'credits' ? 'Number of Credits' : 'Support Amount';

  return (
    <div className="flex flex-1 flex-col w-full max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
        <p className="mt-2 text-gray-600">
          {getDescription()}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            {getLabel()}
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="quantity"
              id="quantity"
              min="1"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>
        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !quantity || parseInt(quantity) < 1}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading || !quantity || parseInt(quantity) < 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : getButtonText()}
        </button>
      </form>
    </div>
  );
}

export default StripePricingTable;
