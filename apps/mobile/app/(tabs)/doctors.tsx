import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Screen } from '../../src/components/shared/Screen';
import { SectionTitle } from '../../src/components/shared/SectionTitle';
import { StateCard } from '../../src/components/shared/StateCard';
import { DoctorFlagshipCard } from '../../src/components/shared/DoctorFlagshipCard';
import { colors, radius } from '../../src/constants/theme';
import { getDoctors } from '../../src/lib/api';
import { Doctor } from '../../src/lib/types';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  async function loadData() {
    try {
      setLoading(true);
      setError('');
      setDoctors(await getDoctors());
    } catch {
      setError('Failed to load doctors.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const departments = useMemo(() => {
    const names = Array.from(new Set(doctors.map((doctor) => doctor.department.name)));
    return ['ALL', ...names];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesKeyword =
        !keyword ||
        [doctor.user.fullName, doctor.specialty, doctor.department.name]
          .join(' ')
          .toLowerCase()
          .includes(keyword);

      const matchesDepartment =
        departmentFilter === 'ALL' || doctor.department.name === departmentFilter;

      return matchesKeyword && matchesDepartment;
    });
  }, [doctors, search, departmentFilter]);

  return (
    <Screen>
      <SectionTitle
        eyebrow="Doctors"
        title="Discover specialists"
        description="A stronger premium doctor discovery page for public users."
      />

      <View style={styles.searchBox}>
        <Search color={colors.textMuted} size={18} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search doctor, specialty, department"
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filtersRow}>
          {departments.map((department) => {
            const active = departmentFilter === department;

            return (
              <Pressable
                key={department}
                onPress={() => setDepartmentFilter(department)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {department === 'ALL' ? 'All Departments' : department}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {loading ? (
        <StateCard
          variant="loading"
          title="Loading doctors"
          description="Preparing premium doctor cards..."
        />
      ) : error ? (
        <StateCard
          variant="error"
          title="Doctors unavailable"
          description={error}
          actionLabel="Retry"
          onActionPress={loadData}
        />
      ) : filteredDoctors.length === 0 ? (
        <StateCard
          variant="empty"
          title="No matching doctors"
          description="Try another keyword or another department."
        />
      ) : (
        filteredDoctors.map((doctor) => (
          <DoctorFlagshipCard
            key={doctor.id}
            doctor={doctor}
            onPress={() => router.push(`/doctor/${doctor.id}`)}
          />
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: colors.primarySoft,
    borderColor: 'rgba(34,211,238,0.24)',
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.primary,
  },
});