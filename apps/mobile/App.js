import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#0F172A", marginBottom: 12 }}>
          Sidra Specialized Hospital
        </Text>
        <Text style={{ fontSize: 16, color: "#475569", textAlign: "center", lineHeight: 24 }}>
          Patient mobile application foundation is ready. The next stages will
          implement authentication, departments, doctors, booking, profile, and
          patient notifications.
        </Text>
      </View>
    </SafeAreaView>
  );
}