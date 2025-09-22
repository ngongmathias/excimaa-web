'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Session, Subscription } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

// Helper to check if we're in the browser
const isBrowser = typeof window !== 'undefined';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Only run on the client side
    if (!isBrowser) return;
    
    let mounted = true;
    let subscription: Subscription | null = null;
    
    // Helper function to safely redirect using Next.js router
    const safeRedirect = (path: string) => {
      const currentPath = window.location.pathname;
      if (currentPath === path) return; // Already on the target page
      
      console.log(`AuthProvider: Navigating to ${path}`);
      router.push(path);
    };
    
    // Handle initial redirect after session is loaded
    const handleInitialRedirect = (session: any) => {
      if (!initialized && !loading) {
        setInitialized(true);
        const currentPath = window.location.pathname;
        const isAuthRoute = ['/login', '/signup', '/forgot-password', '/reset-password'].some(
          route => currentPath.startsWith(route)
        );
        
        if (session && isAuthRoute) {
          safeRedirect('/dashboard');
        } else if (!session && currentPath.startsWith('/dashboard')) {
          safeRedirect('/login');
        }
      }
    };

    // Check active sessions and set the user
    const getSession = async () => {
      try {
        console.log('AuthProvider: Getting session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('AuthProvider: Error getting session:', error);
        } else {
          console.log('AuthProvider: Session retrieved:', session ? 'User found' : 'No user');
          setUser(session?.user ?? null);
          
          // Handle initial redirect after session is loaded
          handleInitialRedirect(session);
        }
      } catch (error) {
        console.error('AuthProvider: Error in getSession:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Listen for changes in auth state
    const { data } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('AuthProvider: Auth state changed:', event, session?.user?.email);
        
        // Update the user state
        setUser(session?.user ?? null);
        
        // If we're in the browser and have a session
        if (isBrowser) {
          console.log('AuthProvider: Browser environment, checking auth state...');
          
          // Force a session check
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          console.log('AuthProvider: Current session from getSession():', currentSession?.user?.email);
          
          // Handle different auth events
          switch (event) {
            case 'SIGNED_IN':
              console.log('AuthProvider: User signed in, redirecting to /dashboard');
              // Use a small timeout to ensure state updates are processed
              setTimeout(() => {
                if (window.location.pathname !== '/dashboard') {
                  console.log('AuthProvider: Redirecting to /dashboard');
                  window.location.href = '/dashboard';
                }
              }, 100);
              break;
              
            case 'SIGNED_OUT':
              console.log('AuthProvider: User signed out, redirecting to /login');
              if (window.location.pathname !== '/login') {
                window.location.href = '/login';
              }
              break;
              
            case 'PASSWORD_RECOVERY':
              console.log('AuthProvider: Password recovery, redirecting to /reset-password');
              if (window.location.pathname !== '/reset-password') {
                window.location.href = '/reset-password';
              }
              break;
              
            default:
              console.log('AuthProvider: Unhandled auth state change:', event);
              break;
          }
        }
        
        setLoading(false);
      }
    );
    
    subscription = data.subscription;
    
    // Get the initial session
    getSession();
    
    // Cleanup function
    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signInWithPassword = async (email: string, password: string) => {
    console.log('AuthProvider: Starting sign in with password for:', email);
    try {
      setLoading(true);
      console.log('AuthProvider: Calling supabase.auth.signInWithPassword');
      
      // Sign in with the provided credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('AuthProvider: signInWithPassword response:', { data, error });
      
      if (error) {
        console.error('AuthProvider: Error during sign in:', error);
        return { error: new Error(error.message) };
      }
      
      // Get the current session
      console.log('AuthProvider: Sign in successful, getting session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('AuthProvider: Error getting session after sign in:', sessionError);
        return { error: new Error(sessionError.message) };
      }
      
      console.log('AuthProvider: Current session after sign in:', session);
      
      if (session) {
        console.log('AuthProvider: Setting user state');
        setUser(session.user);
        
        // Redirect to dashboard after a short delay to ensure state is updated
        setTimeout(() => {
          console.log('AuthProvider: Redirecting to /dashboard from signInWithPassword');
          window.location.href = '/dashboard';
        }, 100);
        
        return { error: null };
      } else {
        console.error('AuthProvider: No session after successful sign in');
        return { error: new Error('No session after sign in') };
      }
    } catch (error) {
      console.error('AuthProvider: Unexpected error during sign in:', error);
      return { error: error instanceof Error ? error : new Error('An unknown error occurred') };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('An unknown error occurred') };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('An unknown error occurred') };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      return { error: error ? new Error(error.message) : null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('An unknown error occurred') };
    }
  };

  const value = {
    user,
    loading,
    signOut,
    signInWithPassword,
    signUp,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
