// app/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMagicLink = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    setLoading(true);

    // Replace 192.168.1.100 with YOUR local IP
    const webRedirectUrl = 'http://192.168.251.31:3000/';

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          Platform.OS === 'web'
            ? webRedirectUrl
            : 'myapp://magic-link'
      }
    });

    setLoading(false);
    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert(
        'Magic Link Sent',
        'Check your email to complete login. ' +
          (Platform.OS === 'web'
            ? 'Open the link in the same browser session.'
            : 'The link should open the app via myapp://magic-link.')
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Magic Link Login</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button
        title={loading ? 'Sending...' : 'Send Magic Link'}
        onPress={handleMagicLink}
      />
    </View>
  );
}
