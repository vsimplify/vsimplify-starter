import { Portfolio, Project, Mission, Agent } from '@/types/portfolio';

export const validatePortfolio = (data: any): data is Portfolio => {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    typeof data.user_id === 'string' &&
    (!data.projects || Array.isArray(data.projects)) &&
    (!data.metrics || typeof data.metrics === 'object')
  );
};
