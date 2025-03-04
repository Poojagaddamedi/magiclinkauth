// app/_layout.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import AuthProvider, { AuthContext } from './auth/AuthProvider';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext missing");
  const { session } = authContext;

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // If there's no session, redirect AFTER we know the route segments
    if (isMounted && segments.length > 0 && !session) {
      setTimeout(() => {
        router.replace('/auth/LoginScreen');
      }, 100);
    }
  }, [isMounted, segments, session]);

  // Always render a <Slot> so the router can mount
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Slot />
      </ProtectedRoute>
    </AuthProvider>
  );
}
