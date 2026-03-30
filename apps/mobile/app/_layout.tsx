import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useSegments } from 'expo-router';
import { getAccessToken } from '../src/lib/storage';
import { colors } from '../src/constants/theme';

export default function RootLayout() {
  const segments = useSegments();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await getAccessToken();

        const inTabs = segments[0] === '(tabs)';
        const inLogin = segments[0] === 'login';
        const inWelcome = segments[0] === 'welcome';
        const inDoctor = segments[0] === 'doctor';
        const inBooking = segments[0] === 'book-appointment';
        const inNotifications = segments[0] === 'notifications';

        if (!token) {
          if (!inLogin && !inWelcome) {
            router.replace('/welcome');
          }
          return;
        }

        if (token) {
          if (inLogin || inWelcome || segments.length === 0) {
            router.replace('/(tabs)/home');
            return;
          }

          if (!inTabs && !inDoctor && !inBooking && !inNotifications) {
            router.replace('/(tabs)/home');
          }
        }
      } finally {
        setBooting(false);
      }
    }

    checkAuth();
  }, [segments]);

  if (booting) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.bootText}>Preparing Sidra Mobile...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  bootText: {
    color: colors.textMuted,
    fontSize: 14,
  },
});