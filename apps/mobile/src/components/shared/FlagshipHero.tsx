import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../../constants/theme';

interface FlagshipHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
}

export function FlagshipHero({
  eyebrow,
  title,
  description,
  imageUrl,
}: FlagshipHeroProps) {
  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.wrapper}
      imageStyle={styles.image}
    >
      <LinearGradient
        colors={[
          'rgba(2,6,23,0.18)',
          'rgba(2,6,23,0.58)',
          'rgba(2,6,23,0.94)',
        ]}
        style={styles.overlay}
      >
        <View style={styles.badge}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 310,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    borderRadius: radius.xl,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 10,
    padding: 22,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(34,211,238,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
  },
  description: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 24,
  },
});