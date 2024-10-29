import { useState, useEffect, useCallback } from 'react';

export type UseInfiniteScrollProps<T> = {
  fetchFn: (page: number) => Promise<T[]>;
  initialPage?: number;
  pageSize?: number;
};

export function useInfiniteScroll<T>({ 
  fetchFn, 
  initialPage = 1,
  pageSize = 10 
}: UseInfiniteScrollProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newItems = await fetchFn(page);
      if (newItems.length < pageSize) {
        setHasMore(false);
      }
      setData(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  }, [fetchFn, page, loading, hasMore, pageSize]);

  return {
    data,
    loading,
    hasMore,
    error,
    loadMore
  };
}
