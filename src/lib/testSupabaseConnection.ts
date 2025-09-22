import { supabase } from './supabaseClient';

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // 1. Check if we can connect to Supabase
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log('Session:', sessionData);
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      throw sessionError;
    }

    // 2. Try to fetch tables (this requires RLS to be properly set up)
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');

    console.log('Available tables:', tables);

    if (tablesError) {
      console.error('Tables error:', tablesError);
      throw tablesError;
    }

    // 3. Try to fetch from test_items
    const { data: testItems, error: testItemsError } = await supabase
      .from('test_items')
      .select('*')
      .limit(1);

    console.log('Test items:', testItems);

    if (testItemsError) {
      console.error('Test items error:', testItemsError);
      throw testItemsError;
    }

    return {
      success: true,
      session: sessionData,
      tables,
      testItems
    };
  } catch (error) {
    console.error('Test connection failed:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
