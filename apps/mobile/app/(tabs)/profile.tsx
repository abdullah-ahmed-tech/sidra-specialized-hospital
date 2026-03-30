import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen } from '../../src/components/shared/Screen';
import { SurfaceCard } from '../../src/components/shared/SurfaceCard';
import { PrimaryButton } from '../../src/components/shared/PrimaryButton';
import { colors, radius } from '../../src/constants/theme';
import { clearSession, getSessionUser } from '../../src/lib/storage';
import { SessionUser } from '../../src/lib/types';

export default function ProfilePage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadUser() {
      const sessionUser = await getSessionUser();
      setUser(sessionUser);
      setFullName(sessionUser?.fullName || '');
      setEmail(sessionUser?.email || '');
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await clearSession();
    router.replace('/login');
  }

  return (
    <Screen>
      <LinearGradient
        colors={['#0b1220', '#111827', '#0f172a']}
        style={styles.hero}
      >
        <Text style={styles.heroEyebrow}>Patient Account</Text>
        <Text style={styles.heroTitle}>{user?.fullName || 'Patient User'}</Text>
        <Text style={styles.heroText}>{user?.email || '--'}</Text>
      </LinearGradient>

      <SurfaceCard elevated>
        <Text style={styles.section}>Profile Shell</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Enter full name"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
          />
        </View>
      </SurfaceCard>

      <SurfaceCard elevated>
        <Text style={styles.section}>Appointment History Shell</Text>
        <Text style={styles.note}>• Cardiology consultation request</Text>
        <Text style={styles.note}>• Pediatric follow-up request</Text>
        <Text style={styles.note}>• Orthopedic assessment request</Text>
      </SurfaceCard>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push('/notifications')}
      >
        <Text style={styles.secondaryButtonText}>Open Notifications</Text>
      </Pressable>

      <PrimaryButton label="Sign Out" onPress={handleLogout} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.xl,
    padding: 22,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 15,
  },
  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  note: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  secondaryButton: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
});