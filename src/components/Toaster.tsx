'use client';

// Simple Toaster component that doesn't require external dependencies
export function Toaster() {
  // This is a no-op implementation to prevent build errors
  // We'll replace it with the actual toast implementation later
  return null;
}

/* Original implementation with react-hot-toast:
import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#4CAF50',
            secondary: '#fff',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#F44336',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
*/
