import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../src/components/shared/Screen';
import { SurfaceCard } from '../src/components/shared/SurfaceCard';
import { PrimaryButton } from '../src/components/shared/PrimaryButton';
import { StateCard } from '../src/components/shared/StateCard';
import { FlagshipHero } from '../src/components/shared/FlagshipHero';
import { SuccessSheet } from '../src/components/shared/SuccessSheet';
import { FadeSlideIn } from '../src/components/shared/FadeSlideIn';
import { colors, radius } from '../src/constants/theme';
import { createAppointment, getDoctors } from '../src/lib/api';
import { Doctor } from '../src/lib/types';

function buildSlot(daysToAdd: number, hour: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

export default function BookAppointmentPage() {
  const params = useLocalSearchParams<{ doctorId?: string; doctorName?: string }>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [error, setError] = useState('');

  const quickSlots = useMemo(
    () => [
      { label: 'Tomorrow 10:00', value: buildSlot(1, 10) },
      { label: 'Tomorrow 13:00', value: buildSlot(1, 13) },
      { label: 'After Tomorrow 17:00', value: buildSlot(2, 17) },
    ],
    [],
  );

  const [form, setForm] = useState({
    doctorId: params.doctorId || '',
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    appointmentDate: quickSlots[0].value,
  });

  const selectedDoctor = doctors.find((doctor) => doctor.id === form.doctorId);

  async function loadDoctors() {
    try {
      setLoadingDoctors(true);
      const data = await getDoctors();
      setDoctors(data);

      if (!params.doctorId && data[0]?.id) {
        setForm((prev) => ({ ...prev, doctorId: data[0].id }));
      }
    } catch {
      setError('Failed to load doctors for booking.');
    } finally {
      setLoadingDoctors(false);
    }
  }

  useEffect(() => {
    loadDoctors();
  }, [params.doctorId]);

  async function handleSubmit() {
    if (!form.doctorId || !form.fullName.trim() || !form.phone.trim()) {
      setError('Doctor, full name, and phone are required.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      await createAppointment({
        doctorId: form.doctorId,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        notes: form.notes.trim() || undefined,
        appointmentDate: form.appointmentDate,
      });

      setForm((prev) => ({
        ...prev,
        fullName: '',
        phone: '',
        email: '',
        notes: '',
        appointmentDate: quickSlots[0].value,
      }));

      setSuccessVisible(true);
    } catch {
      setError('Failed to submit appointment. Verify API connectivity.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <FadeSlideIn delay={0}>
        <FlagshipHero
          eyebrow="Booking Flow"
          title="Request your appointment"
          description="A stronger conversion-oriented booking experience for real users."
          imageUrl="https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=1400&q=80"
        />
      </FadeSlideIn>

      {loadingDoctors ? (
        <StateCard
          variant="loading"
          title="Loading booking flow"
          description="Preparing doctors and premium form states..."
        />
      ) : (
        <>
          <FadeSlideIn delay={90}>
            <SurfaceCard elevated>
              <Text style={styles.summaryEyebrow}>Selected doctor</Text>
              <Text style={styles.summaryTitle}>
                {params.doctorName || selectedDoctor?.user.fullName || 'Choose from the list below'}
              </Text>
              <Text style={styles.summaryText}>
                {selectedDoctor?.specialty ||
                  'Select the doctor you want to continue with for the appointment request.'}
              </Text>
            </SurfaceCard>
          </FadeSlideIn>

          <FadeSlideIn delay={140}>
            <SurfaceCard elevated>
              <View style={styles.field}>
                <Text style={styles.label}>Doctor</Text>
                <View style={styles.selectorList}>
                  {doctors.map((doctor) => {
                    const active = form.doctorId === doctor.id;

                    return (
                      <Pressable
                        key={doctor.id}
                        onPress={() =>
                          setForm((prev) => ({ ...prev, doctorId: doctor.id }))
                        }
                        style={({ pressed }) => [
                          styles.selectorChip,
                          active && styles.selectorChipActive,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.selectorChipText,
                            active && styles.selectorChipTextActive,
                          ]}
                        >
                          {doctor.user.fullName}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  value={form.fullName}
                  onChangeText={(text) => setForm({ ...form, fullName: text })}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  value={form.phone}
                  onChangeText={(text) => setForm({ ...form, phone: text })}
                  placeholder="Enter your phone number"
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                  placeholder="Optional email"
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Suggested time slots</Text>
                <View style={styles.selectorList}>
                  {quickSlots.map((slot) => {
                    const active = form.appointmentDate === slot.value;

                    return (
                      <Pressable
                        key={slot.label}
                        onPress={() =>
                          setForm((prev) => ({ ...prev, appointmentDate: slot.value }))
                        }
                        style={({ pressed }) => [
                          styles.selectorChip,
                          active && styles.selectorChipActive,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.selectorChipText,
                            active && styles.selectorChipTextActive,
                          ]}
                        >
                          {slot.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Appointment ISO Date</Text>
                <TextInput
                  value={form.appointmentDate}
                  onChangeText={(text) => setForm({ ...form, appointmentDate: text })}
                  placeholder="2026-04-05T12:00:00.000Z"
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  value={form.notes}
                  onChangeText={(text) => setForm({ ...form, notes: text })}
                  placeholder="Optional notes"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, styles.textarea]}
                  multiline
                />
              </View>

              <PrimaryButton
                label="Submit Appointment"
                loading={submitting}
                onPress={handleSubmit}
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}
            </SurfaceCard>
          </FadeSlideIn>
        </>
      )}

      <SuccessSheet
        visible={successVisible}
        title="Appointment Request Sent"
        description="Your request was submitted successfully. The hospital team can now review the booking from the dashboard and continue the follow-up flow."
        buttonLabel="Close"
        onClose={() => setSuccessVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryEyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  summaryText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  field: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 56,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  textarea: {
    minHeight: 110,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  selectorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  selectorChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectorChipActive: {
    backgroundColor: colors.primarySoft,
    borderColor: 'rgba(34,211,238,0.22)',
  },
  selectorChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  selectorChipTextActive: {
    color: colors.primary,
  },
  error: {
    color: colors.danger,
    fontSize: 14,
    lineHeight: 22,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
  },
});