'use client';

import { useEffect } from 'react';

// Add error boundary
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.addEventListener('error', (event) => {
      console.error('React Error:', event.error);
    });
  }, []);

  return children;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ErrorBoundary>
  );
}
