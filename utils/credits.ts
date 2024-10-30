import supabase from './supabaseClient';

export const fetchUserCredits = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('credits')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data || { credits: 0 };
  } catch (error) {
    console.error('Error fetching credits:', error);
    return { credits: 0 };
  }
}; 