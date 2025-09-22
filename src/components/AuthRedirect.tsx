'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export function AuthRedirect({ required = true, to = '/login' }: { required?: boolean; to?: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    
    // If auth is required but no user, redirect to login
    if (required && !user) {
      console.log('AuthRedirect: No user found, redirecting to', to);
      router.push(to);
    }
    // If auth is not required but user is logged in, redirect to dashboard
    else if (!required && user) {
      console.log('AuthRedirect: User found, redirecting to /dashboard');
      router.push('/dashboard');
    }
  }, [user, loading, required, to, router]);

  return null;
}
