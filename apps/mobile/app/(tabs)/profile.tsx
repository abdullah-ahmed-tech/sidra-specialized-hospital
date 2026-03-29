import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../src/components/shared/Card';
import { Screen } from '../../src/components/shared/Screen';
import { SectionTitle } from '../../src/components/shared/SectionTitle';
import { colors } from '../../src/constants/theme';

export default function ProfilePage() {
  return (
    <Screen>
      <SectionTitle
        eyebrow="Profile"
        title="Patient profile"
        description="This phase delivers a more polished patient profile shell and prepares for full account management later."
      />

      <Card>
        <Text style={styles.name}>Mohamed Adel</Text>
        <Text style={styles.meta}>patient1@sidra.com</Text>
        <Text style={styles.meta}>01000000003</Text>
      </Card>

      <View style={styles.grid}>
        <Card>
          <Text style={styles.section}>Account Status</Text>
          <Text style={styles.description}>Active patient account</Text>
        </Card>

        <Card>
          <Text style={styles.section}>Upcoming Capabilities</Text>
          <Text style={styles.description}>Appointment history</Text>
          <Text style={styles.description}>Saved medical profile</Text>
          <Text style={styles.description}>Notifications and follow-up</Text>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  meta: {
    fontSize: 15,
    color: colors.textMuted,
  },
  grid: {
    gap: 14,
  },
  section: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 24,
  },
});