import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

export function PremiumCard({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 12,
  },
});