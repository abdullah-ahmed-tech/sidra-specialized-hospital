import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';

const promoItems = [
  {
    title: 'Specialist care with modern patient access',
    subtitle: 'Sidra Experience',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Discover services with stronger visual clarity',
    subtitle: 'Service Discovery',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Book faster with a calmer premium flow',
    subtitle: 'Appointment Journey',
    image:
      'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1400&q=80',
  },
];

export function PromoCarousel() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {promoItems.map((item) => (
          <ImageBackground
            key={item.title}
            source={{ uri: item.image }}
            style={styles.card}
            imageStyle={styles.image}
          >
            <View style={styles.overlay}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.subtitle}</Text>
              </View>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </ImageBackground>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
    paddingRight: 6,
  },
  card: {
    width: 320,
    height: 190,
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
    padding: 18,
    backgroundColor: 'rgba(2,6,23,0.42)',
    gap: 8,
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
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
});