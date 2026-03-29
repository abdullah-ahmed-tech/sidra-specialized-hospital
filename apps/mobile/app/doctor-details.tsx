import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Card } from "../src/components/shared/Card";
import { PrimaryButton } from "../src/components/shared/PrimaryButton";
import { Screen } from "../src/components/shared/Screen";
import { SectionTitle } from "../src/components/shared/SectionTitle";
import { colors } from "../src/constants/theme";

export default function DoctorDetailsPage() {
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    specialty: string;
    department: string;
    fee: string;
    bio: string;
  }>();

  return (
    <Screen>
      <SectionTitle
        eyebrow="Doctor"
        title={params.name || 'Doctor Details'}
        description="Professional doctor presentation improves patient trust and booking conversion."
      />

      <Card>
        <Text style={styles.specialty}>{params.specialty}</Text>
        <Text style={styles.meta}>{params.department}</Text>
        <Text style={styles.bio}>
          {params.bio || 'Experienced specialist within Sidra Specialized Hospital.'}
        </Text>
      </Card>

      <PrimaryButton
        label="Book Appointment"
        onPress={() =>
          router.push({
            pathname: '/book-appointment',
            params: {
              doctorId: params.id,
              doctorName: params.name,
            },
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  specialty: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  meta: {
    fontSize: 15,
    color: colors.textMuted,
  },
  bio: {
    fontSize: 15,
    lineHeight: 25,
    color: colors.text,
  },
});