import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import BrowseAIAgents from '@/components/BrowseAIAgents';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Agent } from '@/types/portfolio';

// Mock Supabase client
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn()
}));

// Mock data
const mockAgents: Agent[] = [
  {
    id: 1,
    role: 'Senior Software Engineer',
    title: 'Scheduler Pro',
    goal: 'Create efficient scheduling algorithms',
    domainId: 103.01,
    tools: ['DUCK_DUCK_GO_SEARCH'],
    user_id: 'test-user',
    email: 'test@example.com',
    creator: 'test-user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    allowDelegation: false,
    memory: false,
    verbose: false,
    image: '/agents_images/103.01-Senior Software Engineer (Scheduler Pro).png'
  }
];

describe('BrowseAIAgents Component', () => {
  beforeEach(() => {
    // Setup environment
    process.env.NODE_ENV = 'test';
    process.env.NEXT_PUBLIC_USE_PROD_DATA = 'false';
    process.env.NEXT_PUBLIC_DEFAULT_USER_ID = 'test-user';

    // Mock Supabase response
    (createClientComponentClient as jest.Mock).mockImplementation(() => ({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({
        data: mockAgents,
        error: null
      })
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render agents correctly', async () => {
    render(
      <BrowseAIAgents 
        userId="test-user"
        onAgentSelect={jest.fn()}
        selectedAgentId={null}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Scheduler Pro')).toBeInTheDocument();
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    });
  });

  it('should handle agent selection', async () => {
    const mockSelect = jest.fn();
    render(
      <BrowseAIAgents 
        userId="test-user"
        onAgentSelect={mockSelect}
        selectedAgentId={null}
      />
    );

    await waitFor(() => {
      const agentCard = screen.getByText('Scheduler Pro').closest('article');
      if (agentCard) fireEvent.click(agentCard);
      expect(mockSelect).toHaveBeenCalledWith(1);
    });
  });

  it('should show loading state', () => {
    render(
      <BrowseAIAgents 
        userId="test-user"
        onAgentSelect={jest.fn()}
        selectedAgentId={null}
      />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should handle errors gracefully', async () => {
    // Mock error response
    (createClientComponentClient as jest.Mock).mockImplementation(() => ({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({
        data: null,
        error: new Error('Failed to load agents')
      })
    }));

    render(
      <BrowseAIAgents 
        userId="test-user"
        onAgentSelect={jest.fn()}
        selectedAgentId={null}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load agents/i)).toBeInTheDocument();
    });
  });
}); 