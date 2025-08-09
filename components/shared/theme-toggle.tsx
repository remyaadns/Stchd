// components/shared/theme-toggle.tsx
import React from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react-native';

export function ThemeToggle() {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      className="p-2 rounded-full bg-background-100 dark:bg-background-800"
    >
      {currentTheme === 'dark' ? (
        <Sun size={20} color="#ffffff" />
      ) : (
        <Moon size={20} color="#000000" />
      )}
    </Pressable>
  );
}