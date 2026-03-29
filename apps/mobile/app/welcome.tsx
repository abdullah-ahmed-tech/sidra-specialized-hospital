import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../src/components/shared/Screen";
import { PrimaryButton } from "../src/components/shared/PrimaryButton";


export default function WelcomePage() {
  return (
    <Screen scroll={false}>
      <LinearGradient
        colors={["#E0F2FE", "#F8FAFC"]}
        style={styles.hero}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Sidra Specialized Hospital</Text>
        </View>

        <Text style={styles.title}>
          Advanced care with a modern patient experience
        </Text>

        <Text style={styles.description}>
          Browse departments, discover doctors, and book appointments through a
          premium medical mobile experience.
        </Text>
      </LinearGradient>

      <View style={styles.actions}>
        <PrimaryButton
          label="Start Now"
          onPress={() => router.push("/login")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    borderRadius: 32,
    padding: 28,
    justifyContent: "center",
    gap: 18,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#CFFAFE",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeText: {
    color: "#0E7490",
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 44,
  },
  description: {
    fontSize: 16,
    lineHeight: 28,
    color: "#475569",
  },
  actions: {
    gap: 12,
  },
});