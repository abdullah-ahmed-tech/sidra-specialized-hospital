import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

interface ImageInfoCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  onPress?: () => void;
}

export function ImageInfoCard({
  title,
  subtitle,
  description,
  imageUrl,
  onPress,
}: ImageInfoCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageInner}
      >
        <View style={styles.overlay}>
          {subtitle ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{subtitle}</Text>
            </View>
          ) : null}
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description ? (
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    height: 180,
  },
  imageInner: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'rgba(2,6,23,0.16)',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  content: {
    padding: 18,
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
});