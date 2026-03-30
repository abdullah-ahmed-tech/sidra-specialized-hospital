import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { CalendarPlus2 } from 'lucide-react-native';
import { colors, radius } from '../../constants/theme';

export function FloatingQuickAction() {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={() => router.push('/book-appointment')}
    >
      <CalendarPlus2 color={colors.background} size={18} />
      <Text style={styles.text}>Book Appointment</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#22d3ee',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  text: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '800',
  },
  pressed: {
    transform: [{ scale: 0.985 }],
  },
});