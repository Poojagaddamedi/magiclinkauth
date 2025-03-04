// app/auth/AuthProvider.tsx
import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';

export interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}
