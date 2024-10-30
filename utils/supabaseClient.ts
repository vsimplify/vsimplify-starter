import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create singleton instance
let supabase: ReturnType<typeof createClient<Database>> | null = null;

const getSupabaseClient = () => {
  if (supabase) return supabase;

  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'app-supabase-auth' // Add unique storage key
    },
    db: {
      schema: 'public'
    }
  });

  // Add session refresh on client init
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      console.log('Auth state changed:', event, session?.user?.id);
    }
  });

  return supabase;
};

export default getSupabaseClient(); 