import { Database } from '@/lib/database.types';
import { MetricsData } from './portfolio';

type DBAgent = Database['public']['Tables']['Agent']['Row'];

export interface Agent extends DBAgent {
  metrics?: MetricsData;
}

export const isAgent = (item: any): item is Agent => {
  return item && 
    typeof item.id === 'number' && 
    typeof item.title === 'string' &&
    typeof item.role === 'string';
};
