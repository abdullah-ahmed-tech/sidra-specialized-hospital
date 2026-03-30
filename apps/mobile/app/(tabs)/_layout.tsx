import { Tabs } from 'expo-router';
import {
  Building2,
  House,
  Stethoscope,
  UserRound,
} from 'lucide-react-native';
import { colors } from '../../src/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#08111f',
          borderTopColor: 'rgba(255,255,255,0.08)',
          height: 82,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '800',
          paddingBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <House color={color} size={focused ? size + 2 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="departments"
        options={{
          title: 'Departments',
          tabBarIcon: ({ color, size, focused }) => (
            <Building2 color={color} size={focused ? size + 2 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctors',
          tabBarIcon: ({ color, size, focused }) => (
            <Stethoscope color={color} size={focused ? size + 2 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <UserRound color={color} size={focused ? size + 2 : size} />
          ),
        }}
      />
    </Tabs>
  );
}