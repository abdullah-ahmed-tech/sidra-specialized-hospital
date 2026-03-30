import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Screen } from '../../src/components/shared/Screen';
import { SectionTitle } from '../../src/components/shared/SectionTitle';
import { StateCard } from '../../src/components/shared/StateCard';
import { ImageInfoCard } from '../../src/components/shared/ImageInfoCard';
import { InfoBanner } from '../../src/components/shared/InfoBanner';
import { getDepartments } from '../../src/lib/api';
import { Department } from '../../src/lib/types';

const departmentImages = [
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80',
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData() {
    try {
      setLoading(true);
      setError('');
      setDepartments(await getDepartments());
    } catch {
      setError('Failed to load departments.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Screen>
      <SectionTitle
        eyebrow="Departments"
        title="Explore hospital specialties"
        description="A richer public-facing departments page with stronger visual blocks."
      />

      <InfoBanner
        eyebrow="Guided Discovery"
        title="Choose the right specialty faster"
        description="The goal of this screen is not only to list departments, but to make the care journey clearer for real users."
      />

      {loading ? (
        <StateCard
          variant="loading"
          title="Loading departments"
          description="Preparing premium department blocks..."
        />
      ) : error ? (
        <StateCard
          variant="error"
          title="Departments unavailable"
          description={error}
          actionLabel="Retry"
          onActionPress={loadData}
        />
      ) : departments.length === 0 ? (
        <StateCard
          variant="empty"
          title="No departments yet"
          description="Departments will appear here when available from the API."
        />
      ) : (
        departments.map((department, index) => (
          <ImageInfoCard
            key={department.id}
            title={department.name}
            subtitle={`Specialty ${index + 1}`}
            description={
              department.description ||
              'Specialized medical department ready for patient discovery.'
            }
            imageUrl={department.imageUrl || departmentImages[index % departmentImages.length]}
          />
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({});