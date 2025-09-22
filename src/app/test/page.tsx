'use client';

'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { supabase, type Database } from '@/lib/supabaseClient.test';

type TestItem = Database['public']['Tables']['test_items']['Row'];


export default function TestPage() {
  const { user } = useUser();
  const [items, setItems] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // Fetch items from the 'test_items' table
  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log('Fetching items...');
      
      if (!supabase) {
        console.error('Supabase client not initialized');
        throw new Error('Failed to connect to the database');
      }
      
      // First, check if we can connect to Supabase
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log('Session:', sessionData);
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw sessionError;
      }

      // Then try to fetch items
      const { data, error } = await supabase
        .from('test_items')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Fetched items:', data);
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      
      setItems(data || []);
    } catch (error) {
      console.error('Error in fetchItems:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      alert(`Error fetching items: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  // Add a new item to the 'test_items' table
  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!user) {
      toast.error('You must be signed in to add items');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('test_items')
        .insert({
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          user_id: user.id
        } as any)
        .select()
        .single();
        
      if (error) throw error;

      if (error) throw error;
      
      if (data) {
        setItems([data, ...items]);
        setFormData(prev => ({ ...prev, title: '', description: '' }));
        toast.success('Item added successfully!');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Check console for details.');
    }
  };

  // Delete an item from the 'test_items' table
  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('test_items')
        .delete()
        .eq('id', id)
        .throwOnError();
      
      setItems(items.filter(item => item.id !== id));
      toast.success('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Check console for details.');
    }
  };

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Test Database Operations</h1>
          <p className="mt-2 text-sm text-gray-600">
            This page allows you to test CRUD operations on the Supabase test_items table.
          </p>
        </div>
        
        {/* Add Item Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <form onSubmit={addItem} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                placeholder="Enter description"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Item
            </button>
          </form>
        </div>

        {/* Items List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Items</h2>
            <button
              onClick={fetchItems}
              disabled={loading}
              className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {loading && items.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading items...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">No items found. Add one above!</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        {item.created_at && (
                          <p className="mt-1 text-xs text-gray-400">
                            Created: {new Date(item.created_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => item.id && deleteItem(item.id)}
                        className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium"
                        title="Delete item"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
