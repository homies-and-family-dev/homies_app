import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/default/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { HomeIcon, ProfileIcon, HeartFavoriteIcon, ShoppingCartIcon } from '@/assets/icons/icons';

const iconColor = '#FFCCEB';
const iconSize = 27;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: '#FFCCEB',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarStyle: {
          height: 70 + insets.bottom,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 0,
          paddingBottom: insets.bottom,
          ...Platform.select({
            ios: {},
            default: {},
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'regular',
          color: '#848484',
          textAlign: 'center',
          paddingTop: 5, // Ajusta el padding para centrar verticalmente
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#FFCCEB',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <SvgXml xml={HomeIcon} width={iconSize} height={iconSize} fill={focused ? '#ffffff' : iconColor} style={{ alignSelf: 'center', marginBottom: -5 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <SvgXml xml={HeartFavoriteIcon} width={iconSize} height={iconSize} fill={focused ? '#ffffff' : iconColor} style={{ alignSelf: 'center', marginBottom: -5 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ focused }) => (
            <SvgXml xml={ShoppingCartIcon} width={iconSize} height={iconSize} fill={focused ? '#ffffff' : iconColor} style={{ alignSelf: 'center', marginBottom: -5 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <SvgXml xml={ProfileIcon} width={iconSize} height={iconSize} fill={focused ? '#ffffff' : iconColor} style={{ alignSelf: 'center', marginBottom: -5 }} />
          ),
        }}
      />
    </Tabs>
  );
}