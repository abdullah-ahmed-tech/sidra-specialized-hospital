import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

export function SurfaceCard({
  children,
  elevated = false,
}: {
  children: ReactNode;
  elevated?: boolean;
}) {
  return (
    <View style={[styles.card, elevated && styles.elevated]}>
      {children}
    </View>
  );
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
  elevated: {
    backgroundColor: colors.surfaceElevated,
  },
});