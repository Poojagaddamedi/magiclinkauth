// app/(tabs)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
