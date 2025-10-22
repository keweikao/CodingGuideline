// components/app/ProtectedRoute.tsx
'use client';

import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/auth');
    }
  }, [isLoading, token, router]);

  if (isLoading || !token) {
    // You can replace this with a more sophisticated skeleton loader
    return <div>Loading...</div>;
  }

  // If authenticated, render the actual page content
  return <>{children}</>;
}
