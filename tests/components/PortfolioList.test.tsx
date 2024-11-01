import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PortfolioList } from '@/components/portfolio/PortfolioList';
import { Portfolio } from '@/types/portfolio';

const mockPortfolios: Portfolio[] = [
  {
    id: '1',
    title: 'Game Development',
    description: 'Game dev portfolio',
    status: 'active',
    progress: 0.5,
    user_id: 'test-user',
    created_at: new Date().toISOString(),
    metrics: {
      tokenUsage: 1000,
      executionTime: 3600,
      costPerExecution: 0.05,
      successRate: 0.95,
      lastUpdated: new Date()
    }
  },
  {
    id: '2',
    title: 'Healthcare Suite',
    description: 'Healthcare portfolio',
    status: 'completed',
    progress: 1.0,
    user_id: 'test-user',
    created_at: new Date().toISOString(),
    metrics: {
      tokenUsage: 2000,
      executionTime: 7200,
      costPerExecution: 0.08,
      successRate: 0.98,
      lastUpdated: new Date()
    }
  }
];

describe('PortfolioList Component', () => {
  it('should render all portfolios initially', () => {
    render(<PortfolioList portfolios={mockPortfolios} selectedDomainId="103.01" />);
    expect(screen.getByText('Game Development')).toBeInTheDocument();
    expect(screen.getByText('Healthcare Suite')).toBeInTheDocument();
  });

  it('should filter by status', async () => {
    render(<PortfolioList portfolios={mockPortfolios} selectedDomainId="103.01" />);
    
    // Select completed status
    const statusFilter = screen.getByPlaceholderText('Filter by Status');
    fireEvent.change(statusFilter, { target: { value: 'completed' } });

    await waitFor(() => {
      expect(screen.queryByText('Game Development')).not.toBeInTheDocument();
      expect(screen.getByText('Healthcare Suite')).toBeInTheDocument();
    });
  });

  it('should filter by progress', async () => {
    render(<PortfolioList portfolios={mockPortfolios} selectedDomainId="103.01" />);
    
    // Select high progress
    const progressFilter = screen.getByPlaceholderText('Filter by Progress');
    fireEvent.change(progressFilter, { target: { value: 'high' } });

    await waitFor(() => {
      expect(screen.queryByText('Game Development')).not.toBeInTheDocument();
      expect(screen.getByText('Healthcare Suite')).toBeInTheDocument();
    });
  });

  it('should sort portfolios', async () => {
    render(<PortfolioList portfolios={mockPortfolios} selectedDomainId="103.01" />);
    
    // Sort by progress
    const sortBy = screen.getByPlaceholderText('Sort by');
    fireEvent.change(sortBy, { target: { value: 'progress' } });

    const portfolioTitles = screen.getAllByRole('heading').map(h => h.textContent);
    expect(portfolioTitles[0]).toBe('Healthcare Suite'); // Should be first due to higher progress
  });
}); 