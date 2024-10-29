type ForUse = 'Personal' | 'Business'
type Audience = 'Individual' | 'Team' | 'Enterprise'
type Domain = 'AI' | 'Web' | 'Mobile' | 'Data' | 'Cloud' | 'Security'
type Area = 'Development' | 'Analysis' | 'Design' | 'Testing' | 'Operations'

export interface CategoryFilter {
  forUse: ForUse
  audience: Audience
  domain: Domain
  area: Area
}

export type Portfolio = {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  progress: number | null;
  project_id: number | null;
  created_at: string;
  user_id: string;
};
