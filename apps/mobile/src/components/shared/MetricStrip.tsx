import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

interface MetricStripProps {
  items: Array<{
    value: string | number;
    label: string;
  }>;
}

export function MetricStrip({ items }: MetricStripProps) {
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
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  value: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
});