import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons  from '@expo/vector-icons/build/Ionicons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a7ea4",
        headerShown: false,
      }}>
      <Tabs.Screen
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home": "home-outline"} size={24} color={color} />
          ),
        }}
        
      />
    </Tabs>
  );
}
