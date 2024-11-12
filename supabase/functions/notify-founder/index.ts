// import { serve } from "https://deno.land/std@0.190.0/http/server.ts"; // Ensure this version is valid
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
// const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
// const supabase = createClient(supabaseUrl, supabaseKey);

// serve(async (req) => {
//   if (req.method !== 'POST') {
//     return new Response('Method not allowed', { 
//       status: 405,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }

//   try {
//     const { email, submitted_date } = await req.json();

//     if (!email || !submitted_date) {
//       return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     // Insert the email into the database
//     const { data, error } = await supabase
//       .from('emails') // Replace with your actual table name
//       .insert([{ email, submitted_date }]);

//     if (error) {
//       throw error;
//     }

//     return new Response(JSON.stringify({ message: 'Email submitted successfully', data }), { 
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error) {
//     console.error('Error processing request:', error);
//     return new Response(JSON.stringify({ error: 'Failed to process request', details: error.message }), { 
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// });

// /* To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

//   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/notify-founder' \
//     --header 'Authorization: Bearer SUPABASE_ANON_KEY' \
//     --header 'Content-Type: application/json' \
//     --data '{"email":"test@example.com","submitted_date":"2024-01-01T00:00:00Z"}'

// */
