import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

export function GlassCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: 'rgba(23,32,51,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    gap: 12,
  },
});