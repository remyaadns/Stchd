import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Moon, Sun, Monitor } from 'lucide-react-native';

export function ThemeSettings() {
  const { theme, currentTheme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <View className="p-4">
      <Text className={`text-lg font-semibold mb-4 ${
        currentTheme === 'dark' ? 'text-white' : 'text-black'
      }`}>
        Theme
      </Text>
      
      <View className="space-y-2">
        {themeOptions.map(({ value, label, icon: Icon }) => (
          <Pressable
            key={value}
            onPress={() => setTheme(value)}
            className={`flex-row items-center p-3 rounded-lg ${
              theme === value 
                ? currentTheme === 'dark' 
                  ? 'bg-blue-600' 
                  : 'bg-blue-100'
                : currentTheme === 'dark'
                  ? 'bg-gray-800'
                  : 'bg-gray-100'
            }`}
          >
            <Icon 
              size={20} 
              color={
                theme === value 
                  ? currentTheme === 'dark' ? '#ffffff' : '#1d4ed8'
                  : currentTheme === 'dark' ? '#9ca3af' : '#6b7280'
              } 
            />
            <Text className={`ml-3 ${
              theme === value 
                ? currentTheme === 'dark' ? 'text-white' : 'text-blue-800'
                : currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {label}
            </Text>
            {theme === value && (
              <View className="ml-auto">
                <View className={`w-2 h-2 rounded-full ${
                  currentTheme === 'dark' ? 'bg-white' : 'bg-blue-600'
                }`} />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// Alternative simple toggle button
export function ThemeToggle() {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      className={`p-2 rounded-full ${
        currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      }`}
    >
      {currentTheme === 'dark' ? (
        <Sun size={20} color="#ffffff" />
      ) : (
        <Moon size={20} color="#000000" />
      )}
    </Pressable>
  );
}