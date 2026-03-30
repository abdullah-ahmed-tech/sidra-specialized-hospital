import { StyleSheet, Text } from 'react-native';
import { Screen } from '../src/components/shared/Screen';
import { SurfaceCard } from '../src/components/shared/SurfaceCard';
import { FlagshipHero } from '../src/components/shared/FlagshipHero';
import { colors } from '../src/constants/theme';

export default function NotificationsPage() {
  return (
    <Screen>
      <FlagshipHero
        eyebrow="Notifications"
        title="Stay updated with your care journey"
        description="This screen helps the product feel more complete and commercially polished even before backend notification delivery is fully closed."
        imageUrl="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80"
      />

      <SurfaceCard elevated>
        <Text style={styles.title}>Upcoming capabilities</Text>
        <Text style={styles.item}>• Appointment confirmation reminders</Text>
        <Text style={styles.item}>• Follow-up messages after visits</Text>
        <Text style={styles.item}>• Service and department announcements</Text>
      </SurfaceCard>

      <SurfaceCard elevated>
        <Text style={styles.title}>Current State</Text>
        <Text style={styles.body}>
          This is now positioned as part of the flagship mobile experience so the
          app feels broader, calmer, and more complete for real public-facing use.
        </Text>
      </SurfaceCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  item: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  body: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
});