import { Colors } from '@/constants/Colors';
import { useAppSelector } from '@/store/hook';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const theme = useAppSelector((state) => state.theme) as 'light' | 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tertiary,
        headerStyle: {
          backgroundColor: Colors[theme].primary,
        },
        headerShadowVisible: false,
        headerTintColor: Colors[theme].opposite_primary,
        tabBarStyle: {
          backgroundColor: Colors[theme].primary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shop',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'storefront-sharp' : 'storefront-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'search-circle-sharp' : 'search-circle-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'star-sharp' : 'star-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person-sharp' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
