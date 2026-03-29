import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../src/components/shared/Card';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { LoadingState } from '../../src/components/shared/LoadingState';
import { Screen } from '../../src/components/shared/Screen';
import { SectionTitle } from '../../src/components/shared/SectionTitle';
import { getDepartments, getDoctors } from '../../src/lib/api';
import { Department, Doctor } from '../../src/lib/types';
import { colors } from '../../src/constants/theme';

export default function HomePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDepartments(), getDoctors()])
      .then(([departmentsData, doctorsData]) => {
        setDepartments(departmentsData);
        setDoctors(doctorsData);
      })
      .catch(() => {
        setDepartments([]);
        setDoctors([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Screen>
      <SectionTitle
        eyebrow="Home"
        title="Welcome to Sidra"
        description="Explore departments, doctors, and your appointment journey."
      />

      <Card>
        <Text style={styles.heroTitle}>
          Modern specialized care at your fingertips
        </Text>
        <Text style={styles.heroText}>
          Discover the right department, review doctor profiles, and submit your
          appointment request from one patient-focused app.
        </Text>
      </Card>

      {loading ? (
        <LoadingState label="Loading home data..." />
      ) : (
        <>
          <View style={styles.grid}>
            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/departments')}
            >
              <Text style={styles.actionTitle}>Departments</Text>
              <Text style={styles.actionMeta}>
                {departments.length} available
              </Text>
            </Pressable>

            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/doctors')}
            >
              <Text style={styles.actionTitle}>Doctors</Text>
              <Text style={styles.actionMeta}>{doctors.length} listed</Text>
            </Pressable>

            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/book-appointment')}
            >
              <Text style={styles.actionTitle}>Book Appointment</Text>
              <Text style={styles.actionMeta}>Fast request flow</Text>
            </Pressable>

            <Pressable
              style={styles.actionCard}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Text style={styles.actionTitle}>Profile</Text>
              <Text style={styles.actionMeta}>Patient details</Text>
            </Pressable>
          </View>

          {!departments.length && !doctors.length ? (
            <EmptyState
              title="No data loaded"
              description="The app could not load departments and doctors. Verify the API is running and reachable."
            />
          ) : null}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  heroText: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
  },
  grid: {
    gap: 14,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 6,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  actionMeta: {
    fontSize: 14,
    color: colors.textMuted,
  },
});