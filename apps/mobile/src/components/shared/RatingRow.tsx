import { StyleSheet, Text, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '../../constants/theme';

export function RatingRow({
  rating = 4.9,
  reviews = 128,
}: {
  rating?: number;
  reviews?: number;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Star key={item} color={colors.warning} fill={colors.warning} size={14} />
        ))}
      </View>
      <Text style={styles.text}>
        {rating.toFixed(1)} · {reviews}+ patient reviews
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 3,
  },
  text: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
});