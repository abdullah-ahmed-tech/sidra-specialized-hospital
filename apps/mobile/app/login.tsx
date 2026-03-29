import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../src/components/shared/Card';
import { PrimaryButton } from '../src/components/shared/PrimaryButton';
import { Screen } from '../src/components/shared/Screen';
import { SectionTitle } from '../src/components/shared/SectionTitle';
import { colors } from '../src/constants/theme';

export default function LoginPage() {
  return (
    <Screen>
      <SectionTitle
        eyebrow="Access"
        title="Patient Login"
        description="Authentication UI foundation for the mobile patient experience."
      />

      <Card>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="patient1@sidra.com"
            style={styles.input}
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="123456"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <PrimaryButton label="Continue" onPress={() => router.replace('/(tabs)/home')} />
      </Card>

      <Text style={styles.note}>
        Demo login is UI-only in this phase. Full token handling can be added in
        the next hardening cycle.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
  note: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 22,
  },
});