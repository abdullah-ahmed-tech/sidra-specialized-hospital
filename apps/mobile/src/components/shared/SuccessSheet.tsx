import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

interface SuccessSheetProps {
  visible: boolean;
  title: string;
  description: string;
  buttonLabel?: string;
  onClose: () => void;
}

export function SuccessSheet({
  visible,
  title,
  description,
  buttonLabel = 'Done',
  onClose,
}: SuccessSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>✓</Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2,6,23,0.62)',
    justifyContent: 'flex-end',
    padding: 18,
  },
  sheet: {
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
    gap: 12,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: 'rgba(16,185,129,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: colors.success,
    fontSize: 28,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  button: {
    marginTop: 6,
    minHeight: 54,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '800',
  },
});