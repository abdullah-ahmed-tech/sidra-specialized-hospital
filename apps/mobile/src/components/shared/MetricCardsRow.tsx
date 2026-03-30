import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

export function MetricCardsRow({
  items,
}: {
  items: Array<{ value: string | number; label: string }>;
}) {
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View key={item.label} style={styles.box}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  value: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
});