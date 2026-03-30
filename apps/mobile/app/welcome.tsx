import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Screen } from '../src/components/shared/Screen';
import { colors, radius } from '../src/constants/theme';
import { FadeSlideIn } from '../src/components/shared/FadeSlideIn';

export default function WelcomePage() {
  return (
    <Screen scroll={false}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <LinearGradient
          colors={[
            'rgba(2,6,23,0.18)',
            'rgba(2,6,23,0.58)',
            'rgba(2,6,23,0.92)',
          ]}
          style={styles.overlay}
        >
          <FadeSlideIn delay={0}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Sidra Specialized Hospital</Text>
            </View>
          </FadeSlideIn>

          <FadeSlideIn delay={100}>
            <Text style={styles.title}>
              Modern care with a premium patient experience
            </Text>
          </FadeSlideIn>

          <FadeSlideIn delay={180}>
            <Text style={styles.description}>
              Discover specialties, explore doctors, and request appointments through
              a public-facing mobile experience designed to feel calm, modern, and trustworthy.
            </Text>
          </FadeSlideIn>

          <FadeSlideIn delay={260}>
            <View style={styles.actions}>
              <Pressable
                style={styles.primaryButton}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.primaryButtonText}>Start Now</Text>
              </Pressable>

              <Pressable
                style={styles.secondaryButton}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.secondaryButtonText}>I already have access</Text>
              </Pressable>
            </View>
          </FadeSlideIn>
        </LinearGradient>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: {
    borderRadius: radius.xl,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    gap: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(34,211,238,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
  },
  description: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});