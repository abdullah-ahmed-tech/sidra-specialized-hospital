import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from '../src/components/shared/Card';
import { PrimaryButton } from '../src/components/shared/PrimaryButton';
import { Screen } from '../src/components/shared/Screen';
import { SectionTitle } from '../src/components/shared/SectionTitle';
import { colors } from '../src/constants/theme';
import { createAppointment } from '../src/lib/api';

export default function BookAppointmentPage() {
  const params = useLocalSearchParams<{ doctorId?: string; doctorName?: string }>();

  const [form, setForm] = useState({
    doctorId: params.doctorId || '',
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedDoctorName = useMemo(
    () => params.doctorName || 'Select from doctors screen first',
    [params.doctorName],
  );

  function validateForm() {
    if (!form.doctorId) {
      setError('Please select a doctor first from the doctors screen.');
      return false;
    }

    if (!form.fullName.trim()) {
      setError('Please enter your full name.');
      return false;
    }

    if (!form.phone.trim()) {
      setError('Please enter your phone number.');
      return false;
    }

    if (!form.appointmentDate.trim()) {
      setError('Please enter the appointment date in YYYY-MM-DD format.');
      return false;
    }

    if (!form.appointmentTime.trim()) {
      setError('Please enter the appointment time in HH:MM format.');
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    setMessage('');
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const isoDate = new Date(
        `${form.appointmentDate}T${form.appointmentTime}:00`,
      ).toISOString();

      await createAppointment({
        doctorId: form.doctorId,
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        notes: form.notes.trim() || undefined,
        appointmentDate: isoDate,
      });

      setMessage('Appointment submitted successfully.');
      setForm((prev) => ({
        ...prev,
        fullName: '',
        phone: '',
        email: '',
        notes: '',
        appointmentDate: '',
        appointmentTime: '',
      }));
    } catch {
      setError('Failed to submit appointment. Verify API and doctor selection.');
    } finally {
      setLoading(false);
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
        <Text style={styles.selectedDoctor}>Doctor: {selectedDoctorName}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={form.phone}
            onChangeText={(text) => setForm({ ...form, phone: text })}
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Appointment Date</Text>
          <TextInput
            value={form.appointmentDate}
            onChangeText={(text) => setForm({ ...form, appointmentDate: text })}
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94A3B8"
          />
          <Text style={styles.helper}>Example: 2026-04-05</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Appointment Time</Text>
          <TextInput
            value={form.appointmentTime}
            onChangeText={(text) => setForm({ ...form, appointmentTime: text })}
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor="#94A3B8"
          />
          <Text style={styles.helper}>Example: 14:30</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            value={form.notes}
            onChangeText={(text) => setForm({ ...form, notes: text })}
            style={[styles.input, styles.textarea]}
            multiline
            placeholder="Add any medical notes"
            placeholderTextColor="#94A3B8"
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <PrimaryButton
          label={loading ? 'Submitting...' : 'Submit Appointment'}
          onPress={handleSubmit}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  selectedDoctor: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
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
    textAlignVertical: 'top',
  },
  helper: {
    fontSize: 12,
    color: colors.textMuted,
  },
  message: {
    fontSize: 14,
    color: colors.success,
    lineHeight: 22,
    fontWeight: '600',
  },
  error: {
    fontSize: 14,
    color: '#E11D48',
    lineHeight: 22,
    fontWeight: '600',
  },
});