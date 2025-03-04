
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

// For native only
let AsyncStorage: any = null;
if (Platform.OS !== 'web') {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
}

const SUPABASE_URL = 'https://zfryusmprmjvdplkvcea.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmcnl1c21wcm1qdmRwbGt2Y2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzMwNTMsImV4cCI6MjA1NjA0OTA1M30.HBbzOFTqKsQD7Qj0bN4UUJiBUnYHQ1lV1hvnNwLZ0Cc';
// Use the new v2 config style
const options: any = {
  auth: {
    detectSessionInUrl: Platform.OS === 'web',
    ...(AsyncStorage ? { storage: AsyncStorage } : {})
  }
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, options);
