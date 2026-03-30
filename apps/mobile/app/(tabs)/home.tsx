import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import {
  Bell,
  CalendarPlus2,
  ChevronRight,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react-native';
import { Screen } from '../../src/components/shared/Screen';
import { SectionTitle } from '../../src/components/shared/SectionTitle';
import { SurfaceCard } from '../../src/components/shared/SurfaceCard';
import { StateCard } from '../../src/components/shared/StateCard';
import { FlagshipHero } from '../../src/components/shared/FlagshipHero';
import { MetricCardsRow } from '../../src/components/shared/MetricCardsRow';
import { DoctorFlagshipCard } from '../../src/components/shared/DoctorFlagshipCard';
import { ServiceShowcaseCard } from '../../src/components/shared/ServiceShowcaseCard';
import { FadeSlideIn } from '../../src/components/shared/FadeSlideIn';
import { PromoCarousel } from '../../src/components/shared/PromoCarousel';
import { ShimmerBlock } from '../../src/components/shared/ShimmerBlock';
import { FloatingQuickAction } from '../../src/components/shared/FloatingQuickAction';
import { colors, radius } from '../../src/constants/theme';
import { getDepartments, getDoctors, getServices } from '../../src/lib/api';
import { Department, Doctor, Service } from '../../src/lib/types';

const serviceImages = [
  'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80',
];

export default function HomePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData() {
    try {
      setLoading(true);
      setError('');
      const [departmentsData, doctorsData, servicesData] = await Promise.all([
        getDepartments(),
        getDoctors(),
        getServices(),
      ]);
      setDepartments(departmentsData);
      setDoctors(doctorsData);
      setServices(servicesData);
    } catch {
      setError('Failed to load home data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <FadeSlideIn delay={0}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.topEyebrow}>Sidra Mobile</Text>
              <Text style={styles.topTitle}>Flagship Patient App</Text>
            </View>

            <Pressable
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
              onPress={() => router.push('/notifications')}
            >
              <Bell color={colors.primary} size={20} />
            </Pressable>
          </View>
        </FadeSlideIn>

        <FadeSlideIn delay={70}>
          <FlagshipHero
            eyebrow="Specialized Care"
            title="Modern healthcare discovery designed for the public"
            description="A stronger premium layer with clear sections, richer hierarchy, and a calmer product feel."
            imageUrl="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80"
          />
        </FadeSlideIn>

        <FadeSlideIn delay={120}>
          <PromoCarousel />
        </FadeSlideIn>

        <FadeSlideIn delay={160}>
          <MetricCardsRow
            items={[
              { value: departments.length, label: 'Departments' },
              { value: doctors.length, label: 'Doctors' },
              { value: services.length, label: 'Services' },
            ]}
          />
        </FadeSlideIn>

        <FadeSlideIn delay={210}>
          <View style={styles.quickGrid}>
            <Pressable
              style={({ pressed }) => [styles.quickTile, pressed && styles.pressed]}
              onPress={() => router.push('/(tabs)/departments')}
            >
              <ShieldCheck color={colors.primary} size={20} />
              <Text style={styles.quickTileTitle}>Departments</Text>
              <Text style={styles.quickTileMeta}>Explore specialties</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.quickTile, pressed && styles.pressed]}
              onPress={() => router.push('/(tabs)/doctors')}
            >
              <Stethoscope color={colors.primary} size={20} />
              <Text style={styles.quickTileTitle}>Doctors</Text>
              <Text style={styles.quickTileMeta}>Browse specialists</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.quickTile, pressed && styles.pressed]}
              onPress={() => router.push('/book-appointment')}
            >
              <CalendarPlus2 color={colors.primary} size={20} />
              <Text style={styles.quickTileTitle}>Book</Text>
              <Text style={styles.quickTileMeta}>Request consultation</Text>
            </Pressable>

            <View style={styles.quickTile}>
              <HeartPulse color={colors.primary} size={20} />
              <Text style={styles.quickTileTitle}>Services</Text>
              <Text style={styles.quickTileMeta}>Clinical offerings</Text>
            </View>
          </View>
        </FadeSlideIn>

        {loading ? (
          <View style={styles.loadingStack}>
            <ShimmerBlock height={170} />
            <ShimmerBlock height={190} />
            <ShimmerBlock height={140} />
          </View>
        ) : error ? (
          <StateCard
            variant="error"
            title="Home data failed"
            description={error}
            actionLabel="Retry"
            onActionPress={loadData}
          />
        ) : (
          <>
            <FadeSlideIn delay={260}>
              <SectionTitle
                eyebrow="Featured Doctors"
                title="Specialists patients notice first"
                description="Designed like a premium healthcare app, not a student project."
              />
            </FadeSlideIn>

            <FadeSlideIn delay={300}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.horizontalRow}>
                  {doctors.slice(0, 4).map((doctor) => (
                    <View key={doctor.id} style={styles.horizontalCard}>
                      <DoctorFlagshipCard
                        doctor={doctor}
                        onPress={() => router.push(`/doctor/${doctor.id}`)}
                      />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </FadeSlideIn>

            <FadeSlideIn delay={340}>
              <SectionTitle
                eyebrow="Service Discovery"
                title="What patients can actually access"
                description="This section makes the app feel broader and more commercial."
              />
            </FadeSlideIn>

            <FadeSlideIn delay={380}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.horizontalRow}>
                  {services.slice(0, 3).map((service, index) => (
                    <ServiceShowcaseCard
                      key={service.id}
                      title={service.name}
                      department={service.department.name}
                      description={
                        service.shortDescription ||
                        service.description ||
                        'Clinical service ready for patient discovery.'
                      }
                      imageUrl={serviceImages[index % serviceImages.length]}
                    />
                  ))}
                </View>
              </ScrollView>
            </FadeSlideIn>

            <FadeSlideIn delay={420}>
              <SectionTitle
                eyebrow="Department Highlights"
                title="Clear specialty structure"
                description="Better scanning rhythm and stronger visual blocks."
              />
            </FadeSlideIn>

            <FadeSlideIn delay={460}>
              {departments.slice(0, 4).map((department) => (
                <SurfaceCard key={department.id} elevated>
                  <Text style={styles.cardTitle}>{department.name}</Text>
                  <Text style={styles.cardText}>
                    {department.description ||
                      'Specialized medical department ready for patient discovery.'}
                  </Text>
                </SurfaceCard>
              ))}
            </FadeSlideIn>

            <FadeSlideIn delay={500}>
              <View style={styles.ctaBanner}>
                <Text style={styles.ctaTitle}>Need fast appointment access?</Text>
                <Text style={styles.ctaText}>
                  Move directly into the booking flow with a stronger conversion-style layout.
                </Text>

                <Pressable
                  style={({ pressed }) => [styles.ctaButton, pressed && styles.pressed]}
                  onPress={() => router.push('/book-appointment')}
                >
                  <Text style={styles.ctaButtonText}>Book Appointment</Text>
                  <ChevronRight color={colors.background} size={16} />
                </Pressable>
              </View>
            </FadeSlideIn>
          </>
        )}
      </Screen>

      <FloatingQuickAction />
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  topTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickGrid: {
    gap: 12,
  },
  quickTile: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 8,
  },
  quickTileTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  quickTileMeta: {
    color: colors.textMuted,
    fontSize: 14,
  },
  horizontalRow: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 6,
  },
  horizontalCard: {
    width: 310,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  cardText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  ctaBanner: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElevated,
    padding: 22,
    gap: 10,
  },
  ctaTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  ctaText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  ctaButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '800',
  },
  loadingStack: {
    gap: 14,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
  },
});