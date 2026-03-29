import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from '../../src/components/shared/Card';
import { EmptyState } from '../../src/components/shared/EmptyState';
import { LoadingState } from '../../src/components/shared/LoadingState';
import { Screen } from '../../src/components/shared/Screen';
import { SectionTitle } from '../../src/components/shared/SectionTitle';
import { colors } from '../../src/constants/theme';
import { getDepartments } from '../../src/lib/api';
import { Department } from '../../src/lib/types';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch(() => setDepartments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Screen>
      <SectionTitle
        eyebrow="Departments"
        title="Medical departments"
        description="Discover the available specialties in Sidra Specialized Hospital."
      />

      {loading ? (
        <LoadingState label="Loading departments..." />
      ) : departments.length === 0 ? (
        <EmptyState
          title="No departments found"
          description="No departments are available right now. Verify the API and seed data."
        />
      ) : (
        departments.map((department) => (
          <Card key={department.id}>
            <Text style={styles.name}>{department.name}</Text>
            <Text style={styles.description}>
              {department.description ||
                'Specialized medical department ready for patient discovery.'}
            </Text>
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
  },
});