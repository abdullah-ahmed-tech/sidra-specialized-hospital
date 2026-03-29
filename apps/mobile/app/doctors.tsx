import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Card } from "../src/components/shared/Card";
import { Screen } from "../src/components/shared/Screen";
import { SectionTitle } from "../src/components/shared/SectionTitle";
import { colors } from "../src/constants/theme";
import { getDoctors } from "../src/lib/api";
import { Doctor } from "../src/lib/types";


export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    getDoctors().then(setDoctors).catch(() => {});
  }, []);

  return (
    <Screen>
      <SectionTitle
        eyebrow="Doctors"
        title="Our specialists"
        description="Browse doctor profiles and move directly into appointment booking."
      />

      {doctors.map((doctor) => (
        <Pressable
          key={doctor.id}
          onPress={() =>
            router.push({
              pathname: "/doctor-details",
              params: {
                id: doctor.id,
                name: doctor.user.fullName,
                specialty: doctor.specialty,
                department: doctor.department.name,
                fee: String(doctor.consultationFee ?? ""),
                bio: doctor.bio || "",
              },
            })
          }
        >
          <Card>
            <Text style={styles.name}>{doctor.user.fullName}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            <Text style={styles.meta}>{doctor.department.name}</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  specialty: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  meta: {
    fontSize: 14,
    color: colors.textMuted,
  },
});