import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
});