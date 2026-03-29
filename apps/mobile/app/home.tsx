import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../src/components/shared/Card";
import { Screen } from "../src/components/shared/Screen";
import { SectionTitle } from "../src/components/shared/SectionTitle";
import { getDepartments, getDoctors } from "../src/lib/api";
import { Department, Doctor } from "../src/lib/types";
import { colors } from "../src/constants/theme";

export default function HomePage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    Promise.all([getDepartments(), getDoctors()])
      .then(([departmentsData, doctorsData]) => {
        setDepartments(departmentsData);
        setDoctors(doctorsData);
      })
      .catch(() => {});
  }, []);

  return (
    <Screen>
      <SectionTitle
        eyebrow="Home"
        title="Welcome to Sidra"
        description="Explore departments, doctors, and your appointment journey."
      />

      <Card>
        <Text style={styles.heroTitle}>Modern specialized care at your fingertips</Text>
        <Text style={styles.heroText}>
          Discover the right department, review doctor profiles, and submit your
          appointment request from one patient-focused app.
        </Text>
      </Card>

      <View style={styles.grid}>
        <Pressable style={styles.actionCard} onPress={() => router.push("/departments")}>
          <Text style={styles.actionTitle}>Departments</Text>
          <Text style={styles.actionMeta}>{departments.length} available</Text>
        </Pressable>

        <Pressable style={styles.actionCard} onPress={() => router.push("/doctors")}>
          <Text style={styles.actionTitle}>Doctors</Text>
          <Text style={styles.actionMeta}>{doctors.length} listed</Text>
        </Pressable>

        <Pressable style={styles.actionCard} onPress={() => router.push("/book-appointment")}>
          <Text style={styles.actionTitle}>Book Appointment</Text>
          <Text style={styles.actionMeta}>Fast request flow</Text>
        </Pressable>

        <Pressable style={styles.actionCard} onPress={() => router.push("/profile")}>
          <Text style={styles.actionTitle}>Profile</Text>
          <Text style={styles.actionMeta}>Patient details</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 6,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  actionMeta: {
    fontSize: 14,
    color: colors.textMuted,
  },
});