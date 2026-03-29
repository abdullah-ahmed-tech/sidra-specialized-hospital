import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "../src/components/shared/Card";
import { Screen } from "../src/components/shared/Screen";
import { SectionTitle } from "../src/components/shared/SectionTitle";
import { colors } from "../src/constants/theme";
import { getDepartments } from "../src/lib/api";
import { Department } from "../src/lib/types";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    getDepartments().then(setDepartments).catch(() => {});
  }, []);

  return (
    <Screen>
      <SectionTitle
        eyebrow="Departments"
        title="Medical departments"
        description="Discover the available specialties in Sidra Specialized Hospital."
      />

      {departments.map((department) => (
        <Card key={department.id}>
          <Text style={styles.name}>{department.name}</Text>
          <Text style={styles.description}>
            {department.description || "Specialized medical department ready for patient discovery."}
          </Text>
        </Card>
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
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textMuted,
  },
});