import { useEffect, useMemo, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen } from '../../src/components/shared/Screen';
import { SurfaceCard } from '../../src/components/shared/SurfaceCard';
import { PrimaryButton } from '../../src/components/shared/PrimaryButton';
import { StateCard } from '../../src/components/shared/StateCard';
import { RatingRow } from '../../src/components/shared/RatingRow';
import { colors, radius } from '../../src/constants/theme';
import { getDoctors } from '../../src/lib/api';
import { Doctor } from '../../src/lib/types';

function formatMoney(value?: string | number | null) {
  if (value === null || value === undefined || value === '') return '--';
  const numeric = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(numeric)) return '--';

  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 2,
  }).format(numeric);
}

export default function DoctorDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData() {
    try {
      setLoading(true);
      setError('');
      setDoctors(await getDoctors());
    } catch {
      setError('Failed to load doctor details.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const doctor = useMemo(
    () => doctors.find((item) => item.id === id),
    [doctors, id],
  );

  if (loading) {
    return (
      <Screen>
        <StateCard
          variant="loading"
          title="Loading doctor profile"
          description="Preparing premium details..."
        />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <StateCard
          variant="error"
          title="Profile unavailable"
          description={error}
          actionLabel="Retry"
          onActionPress={loadData}
        />
      </Screen>
    );
  }

  if (!doctor) {
    return (
      <Screen>
        <StateCard
          variant="empty"
          title="Doctor not found"
          description="This profile is currently unavailable."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <ImageBackground
        source={{
          uri:
            doctor.imageUrl ||
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80',
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.departmentBadge}>
            <Text style={styles.departmentBadgeText}>{doctor.department.name}</Text>
          </View>

          <Text style={styles.heroTitle}>{doctor.user.fullName}</Text>
          <Text style={styles.heroSubtitle}>{doctor.specialty}</Text>
          <RatingRow />
        </View>
      </ImageBackground>

      <View style={styles.statsRow}>
        <SurfaceCard elevated>
          <Text style={styles.statLabel}>Experience</Text>
          <Text style={styles.statValue}>
            {doctor.experienceYears || '--'} years
          </Text>
        </SurfaceCard>

        <SurfaceCard elevated>
          <Text style={styles.statLabel}>Consultation Fee</Text>
          <Text style={styles.statValue}>
            {formatMoney(doctor.consultationFee)}
          </Text>
        </SurfaceCard>
      </View>

      <SurfaceCard elevated>
        <Text style={styles.sectionTitle}>Biography</Text>
        <Text style={styles.body}>
          {doctor.bio ||
            'Experienced medical professional within Sidra Specialized Hospital.'}
        </Text>
      </SurfaceCard>

      <SurfaceCard elevated>
        <Text style={styles.sectionTitle}>Languages</Text>
        <View style={styles.tagsRow}>
          {doctor.languages?.length ? (
            doctor.languages.map((language) => (
              <Pressable key={language} style={styles.tag}>
                <Text style={styles.tagText}>{language}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.body}>Not specified</Text>
          )}
        </View>
      </SurfaceCard>

      <SurfaceCard elevated>
        <Text style={styles.sectionTitle}>Patient Highlights</Text>
        <Text style={styles.body}>• Clear specialist presentation</Text>
        <Text style={styles.body}>• Faster decision toward booking</Text>
        <Text style={styles.body}>• Stronger trust through profile depth</Text>
      </SurfaceCard>

      <PrimaryButton
        label="Book Appointment"
        onPress={() =>
          router.push({
            pathname: '/book-appointment',
            params: {
              doctorId: doctor.id,
              doctorName: doctor.user.fullName,
            },
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 320,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: {
    borderRadius: radius.xl,
  },
  heroOverlay: {
    flex: 1,
    padding: 22,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(2,6,23,0.44)',
    gap: 8,
  },
  departmentBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  departmentBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
  },
  heroSubtitle: {
    color: '#dbeafe',
    fontSize: 15,
    fontWeight: '700',
  },
  statsRow: {
    gap: 14,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  statValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  body: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  tagText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});