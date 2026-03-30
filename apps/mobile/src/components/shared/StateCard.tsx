import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

interface StateCardProps {
  title: string;
  description: string;
  variant?: 'loading' | 'error' | 'empty';
  actionLabel?: string;
  onActionPress?: () => void;
}

export function StateCard({
  title,
  description,
  variant = 'empty',
  actionLabel,
  onActionPress,
}: StateCardProps) {
  const accentColor =
    variant === 'error'
      ? colors.danger
      : variant === 'loading'
      ? colors.warning
      : colors.primary;

  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${accentColor}22` }]}>
        <Text style={[styles.iconText, { color: accentColor }]}>
          {variant === 'error' ? '!' : variant === 'loading' ? '…' : '✦'}
        </Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionLabel && onActionPress ? (
        <Pressable style={styles.button} onPress={onActionPress}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 54,
    height: 54,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    marginTop: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
});