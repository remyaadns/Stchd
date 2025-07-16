import React from 'react'
import { useFonts } from 'expo-font';
import "@/global.css";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/providers/AuthProvider';
import { PostProvider } from '@/providers/PostProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Keep splash screen visible while fonts are loading.
    return null;
  }
  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PostProvider>
        <Stack initialRouteName='(auth)'>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="post" options={{ headerShown: false, presentation: "modal" }} />
          <Stack.Screen name="camera" options={{ headerShown: false, presentation: "modal" }} />
          <Stack.Screen name="gif" options={{ headerShown: false, presentation: "modal" }} />
          <Stack.Screen name="places" options={{ headerShown: false, presentation: "modal" }} />
          <Stack.Screen name="thread" options={{ headerShown: false }} />  
          <Stack.Screen name="user" /> 
          <Stack.Screen name="+not-found" />
        </Stack>
        </PostProvider>
      </AuthProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
} 
