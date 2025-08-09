import React from 'react'
import { useFonts } from 'expo-font';
import "@/global.css";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/providers/AuthProvider';
import { PostProvider } from '@/providers/PostProvider';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Pressable, StatusBar } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

// Inner component that uses theme
function AppContent() {
  const { currentTheme } = useTheme();
  
  return (
    <>
      <StatusBar 
        barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={currentTheme === 'dark' ? '#000000' : '#ffffff'}
      />
      <GluestackUIProvider mode={currentTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PostProvider>
              <Stack initialRouteName='(auth)'
              // screenOptions={{
              //   headerTransparent: true,
              //   headerLeft: ({ canGoBack }) => (
              //     <Pressable onPress={canGoBack ? () => router.back() : undefined }>
              //     <ChevronLeft color='#000' />
              //     </Pressable>
              //   )
              // }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="post" options={{ headerShown: false, presentation: "modal" }} />
                <Stack.Screen name="camera" options={{ headerShown: false, presentation: "modal" }} />
                <Stack.Screen name="gif" options={{ headerShown: false, presentation: "modal" }} />
                <Stack.Screen name="places" options={{ headerShown: false, presentation: "modal" }} />
                <Stack.Screen name="thread" options={{ headerShown: false }} />  
                <Stack.Screen name="posts" options={{ 
                  title: 'Posts',
                  headerStyle: {
                    backgroundColor: currentTheme === 'dark' ? '#000000' : '#ffffff',
                  },
                  headerTintColor: currentTheme === 'dark' ? '#ffffff' : '#000000',
                }} /> 
                <Stack.Screen name="user" options={{
                  headerStyle: {
                    backgroundColor: currentTheme === 'dark' ? '#000000' : '#ffffff',
                  },
                  headerTintColor: currentTheme === 'dark' ? '#ffffff' : '#000000',
                }} /> 
                <Stack.Screen name="settings" options={{ headerShown: false }} /> 
                <Stack.Screen name="+not-found" />
              </Stack>
            </PostProvider>
          </AuthProvider>
        </QueryClientProvider>
      </GluestackUIProvider>
    </>
  );
}

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
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}