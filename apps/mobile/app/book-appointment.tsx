import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Card } from "../src/components/shared/Card";
import { PrimaryButton } from "../src/components/shared/PrimaryButton";
import { Screen } from "../src/components/shared/Screen";
import { SectionTitle } from "../src/components/shared/SectionTitle";
import { colors } from "../src/constants/theme";
import { createAppointment } from "../src/lib/api";

export default function BookAppointmentPage() {
  const params = useLocalSearchParams<{ doctorId?: string; doctorName?: string }>();

  const [form, setForm] = useState({
    doctorId: params.doctorId || "",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
    appointmentDate: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit() {
    try {
      await createAppointment({
        doctorId: form.doctorId,
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        notes: form.notes,
        appointmentDate: form.appointmentDate,
      });

      setMessage("Appointment submitted successfully.");
      setForm((prev) => ({
        ...prev,
        fullName: "",
        phone: "",
        email: "",
        notes: "",
        appointmentDate: "",
      }));
    } catch {
      setMessage("Failed to submit appointment. Verify API and doctor selection.");
    }
  }

  return (
    <Screen>
      <SectionTitle
        eyebrow="Appointment"
        title="Book your consultation"
        description="Submit a fast appointment request directly from the mobile experience."
      />

      <Card>
        <Text style={styles.selectedDoctor}>
          Doctor: {params.doctorName || "Select from doctors screen first"}
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Appointment Date</Text>
          <TextInput
            placeholder="2026-04-05T12:00:00.000Z"
            value={form.appointmentDate}
            onChangeText={(text) => setForm({ ...form, appointmentDate: text })}
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            value={form.notes}
            onChangeText={(text) => setForm({ ...form, notes: text })}
            style={[styles.input, styles.textarea]}
            multiline
          />
        </View>

        <PrimaryButton label="Submit Appointment" onPress={handleSubmit} />

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  selectedDoctor: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
  textarea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  message: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 22,
  },
});