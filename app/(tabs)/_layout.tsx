import { Tabs } from 'expo-router';
import React from 'react';
// import { Ionicons } from '@expo/vector-icons';
import { Home, Search, Plus, User, Heart } from "lucide-react-native";
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';


export default function TabLayout() {
  const router = useRouter();
   const colorScheme = useColorScheme(); 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',  

       
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff',  
          borderTopWidth: 0,
        },
        
        headerShown: false,
      }}
    >
      <Tabs.Screen  
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => 
            <Home color={color} size={24} />
        }}
      />
      <Tabs.Screen  
        name="search"
        options={{
          title: '',
          tabBarIcon: ({ color }) => 
            <Search color={color} size={24} />
        }} 
      />
      <Tabs.Screen  
        name="empty"
        options={{
          title: '',
          tabBarIcon: ({ color }) => 
            <Plus color={color} size={24} />
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/post');
          },
        }} 
      />
      <Tabs.Screen  
        name="activity"
        options={{
          title: "",
          tabBarIcon: ({ color }) => 
            <Heart color={color} size={24} />
        }} 
      />
      <Tabs.Screen  
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => 
            <User color={color} size={24} />
        }} 
      />
    </Tabs>
  );
}