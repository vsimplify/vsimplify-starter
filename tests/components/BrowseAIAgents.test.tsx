import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BrowseAIAgents from '@/components/BrowseAIAgents';
import { FEATURES } from '@/mvp/config/features';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Mock Supabase client
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn()
}));

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_USE_PROD_DATA: 'false',
  NEXT_PUBLIC_DEFAULT_USER_ID: 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
};

describe('BrowseAIAgents Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Reset environment
    process.env = { ...mockEnv };
    
    // Setup QueryClient
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Mock Supabase response
    (createClientComponentClient as jest.Mock).mockImplementation(() => ({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({
        data: [
          {
            id: 1,
            role: 'Senior Software Engineer',
            domainId: 103.01,
            // ... other agent properties
          }
        ],
        error: null
      })
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render in MVP mode with correct number of agents', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowseAIAgents 
          userId={mockEnv.NEXT_PUBLIC_DEFAULT_USER_ID}
          onAgentSelect={jest.fn()}
          selectedAgentId={null}
        />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    });
  });

  it('should filter agents by focus area', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowseAIAgents 
          userId={mockEnv.NEXT_PUBLIC_DEFAULT_USER_ID}
          onAgentSelect={jest.fn()}
          selectedAgentId={null}
        />
      </QueryClientProvider>
    );

    // Select "Work 💼" focus area
    const focusAreaSelect = screen.getByPlaceholderText('Select Focus Area');
    fireEvent.change(focusAreaSelect, { target: { value: 'Work 💼' } });

    await waitFor(() => {
      expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
      // Should not show home agents
      expect(screen.queryByText('Home Assistant')).not.toBeInTheDocument();
    });
  });

  // Test environment switching
  it('should load different agents in PROD mode', async () => {
    process.env.NEXT_PUBLIC_USE_PROD_DATA = 'true';

    render(
      <QueryClientProvider client={queryClient}>
        <BrowseAIAgents 
          userId={mockEnv.NEXT_PUBLIC_DEFAULT_USER_ID}
          onAgentSelect={jest.fn()}
          selectedAgentId={null}
        />
      </QueryClientProvider>
    );

    await waitFor(() => {
      // Should show more agents in PROD mode
      expect(screen.getAllByRole('article').length).toBeGreaterThan(3);
    });
  });

  // Test filtering cascade
  it('should update available options based on selections', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowseAIAgents 
          userId={mockEnv.NEXT_PUBLIC_DEFAULT_USER_ID}
          onAgentSelect={jest.fn()}
          selectedAgentId={null}
        />
      </QueryClientProvider>
    );

    // Select Work focus area
    const focusAreaSelect = screen.getByPlaceholderText('Select Focus Area');
    fireEvent.change(focusAreaSelect, { target: { value: 'Work 💼' } });

    // Check that Audience options updated
    await waitFor(() => {
      const audienceSelect = screen.getByPlaceholderText('Select Audience');
      expect(audienceSelect).not.toBeDisabled();
      expect(screen.getByText('Individual 👤')).toBeInTheDocument();
    });
  });
}); 