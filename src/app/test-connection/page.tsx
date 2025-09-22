'use client';

import { useEffect, useState } from 'react';
import { testSupabaseConnection } from '@/lib/testSupabaseConnection';

export default function TestConnectionPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      setLoading(true);
      const testResult = await testSupabaseConnection();
      setResult(testResult);
      setLoading(false);
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          {result?.success ? (
            <div className="text-green-600">
              <p>✅ Successfully connected to Supabase!</p>
              <p className="mt-2">You can now go back to the <a href="/test" className="text-indigo-600 hover:underline">test page</a>.</p>
            </div>
          ) : (
            <div className="text-red-600">
              <p>❌ Failed to connect to Supabase</p>
              <p className="mt-2">Please check the following:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Ensure your <code className="bg-gray-100 px-1 rounded">.env.local</code> file has the correct Supabase URL and anon key</li>
                <li>Verify that the <code className="bg-gray-100 px-1 rounded">test_items</code> table exists in your Supabase database</li>
                <li>Check that Row Level Security (RLS) is properly configured</li>
                <li>Look for any error messages in your browser's console (press F12 to open developer tools)</li>
              </ul>
              <p className="mt-4">The error was: <code className="bg-gray-100 px-2 py-1 rounded">{result?.error || 'Unknown error'}</code></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
