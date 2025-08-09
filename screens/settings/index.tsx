import React from 'react';
import { SafeAreaView, View, useColorScheme } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Pressable } from 'react-native';
import { ArrowLeft, Moon, Sun, Bell, Shield, HelpCircle, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function Settings() {
  const router = useRouter();
  const { user, logOut } = useAuth();
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  const settingsOptions = [
    {
      title: 'Appearance',
      subtitle: 'Dark mode, theme preferences',
      icon: colorScheme === 'dark' ? Moon : Sun,
      onPress: () => {
        console.log('Toggle theme');
      },
    },
    {
      title: 'Notifications',
      subtitle: 'Push notifications, email alerts',
      icon: Bell,
      onPress: () => {
        console.log('Navigate to notifications settings');
      },
    },
    {
      title: 'Privacy & Security',
      subtitle: 'Account privacy, blocked users',
      icon: Shield,
      onPress: () => {
        console.log('Navigate to privacy settings');
      },
    },
    {
      title: 'Help & Support',
      subtitle: 'FAQ, contact support',
      icon: HelpCircle,
      onPress: () => {
        console.log('Navigate to help');
      },
    },
    {
      title: 'About',
      subtitle: 'App version, terms of service',
      icon: Info,
      onPress: () => {
        console.log('Navigate to about');
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 pt-10 bg-white dark:bg-black">
      <HStack className="items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <Pressable onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color={iconColor} />
        </Pressable>
        <Text size="xl" bold className="text-black dark:text-white">
          Settings
        </Text>
        <View style={{ width: 32 }} /> 
      </HStack>

      <VStack className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Text size="lg" bold className="text-black dark:text-white">
          {user?.username || 'User'}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          {user?.email || 'email@example.com'}
        </Text>
      </VStack>

      <VStack className="flex-1">
        {settingsOptions.map((option, index) => (
          <Pressable
            key={index}
            onPress={option.onPress}
            className="p-4 border-b border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-900"
          >
            <HStack className="items-center justify-between">
              <HStack className="items-center flex-1" space="md">
                <option.icon size={20} color={iconColor} />
                <VStack className="flex-1">
                  <Text bold className="text-black dark:text-white">
                    {option.title}
                  </Text>
                  <Text size="sm" className="text-gray-600 dark:text-gray-400">
                    {option.subtitle}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </Pressable>
        ))}
      </VStack>

      <VStack className="p-4">
        <Button
          onPress={logOut}
          variant="outline"
          className="border-red-500 bg-red-50 dark:bg-red-900/20"
        >
          <Text bold className="text-red-500">
            Sign Out
          </Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}