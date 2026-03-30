import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Screen } from '../src/components/shared/Screen';
import { SurfaceCard } from '../src/components/shared/SurfaceCard';
import { PrimaryButton } from '../src/components/shared/PrimaryButton';
import { colors, radius } from '../src/constants/theme';
import { loginPatient } from '../src/lib/api';
import { saveSession } from '../src/lib/storage';

export default function LoginPage() {
  const [email, setEmail] = useState('patient1@sidra.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      setLoading(true);
      setError('');

      const result = await loginPatient(email.trim(), password);

      if (result.user.role !== 'PATIENT') {
        setError('This mobile app is configured for patient accounts only.');
        return;
      }

      await saveSession(result.accessToken, result.user);
      router.replace('/(tabs)/home');
    } catch (err) {
      console.error('LOGIN ERROR:', err);
      setError('Invalid login credentials or API is unavailable.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <LinearGradient
        colors={['#0b1220', '#111827', '#0f172a']}
        style={styles.hero}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Sidra Specialized Hospital</Text>
        </View>

        <Text style={styles.heroTitle}>Premium patient access</Text>
        <Text style={styles.heroText}>
          Sign in to a modern hospital experience designed for public-facing trust,
          clarity, and faster access to specialists and appointments.
        </Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricNumber}>24/7</Text>
            <Text style={styles.metricLabel}>Availability</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricNumber}>Fast</Text>
            <Text style={styles.metricLabel}>Booking Flow</Text>
          </View>
        </View>
      </LinearGradient>

      <SurfaceCard elevated>
        <Text style={styles.formEyebrow}>Patient Sign In</Text>
        <Text style={styles.formTitle}>Continue to Sidra Mobile</Text>
        <Text style={styles.formDescription}>
          Use the seeded patient account to enter the live mobile product flow.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="patient1@sidra.com"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="123456"
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <PrimaryButton
          label="Enter Mobile App"
          loading={loading}
          onPress={handleLogin}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </SurfaceCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.xl,
    padding: 22,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 31,
    fontWeight: '800',
    lineHeight: 38,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metricBox: {
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  metricNumber: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  formEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  formTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  formDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
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
  error: {
    color: colors.danger,
    fontSize: 14,
    lineHeight: 22,
  },
});