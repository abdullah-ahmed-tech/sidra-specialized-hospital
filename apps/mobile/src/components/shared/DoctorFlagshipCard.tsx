import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../constants/theme';
import { Doctor } from '../../lib/types';

export function DoctorFlagshipCard({
  doctor,
  onPress,
}: {
  doctor: Doctor;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground
        source={{
          uri:
            doctor.imageUrl ||
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80',
        }}
        style={styles.image}
        imageStyle={styles.imageInner}
      >
        <View style={styles.overlay}>
          <View style={styles.departmentBadge}>
            <Text style={styles.departmentBadgeText}>{doctor.department.name}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.name}>{doctor.user.fullName}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <Text style={styles.bio} numberOfLines={3}>
          {doctor.bio ||
            'Experienced medical professional within Sidra Specialized Hospital.'}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Experience</Text>
            <Text style={styles.metaValue}>
              {doctor.experienceYears || '--'} yrs
            </Text>
          </View>

          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Care Level</Text>
            <Text style={styles.metaValue}>Premium</Text>
          </View>
        </View>
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
    height: 240,
    justifyContent: 'flex-start',
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
  departmentBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  departmentBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  content: {
    padding: 18,
    gap: 8,
  },
  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  specialty: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  bio: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metaBox: {
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },
});