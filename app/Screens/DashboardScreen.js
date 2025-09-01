import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Shipathon 🚀</Text>
      <Text style={styles.subtitle}>
        Track your progress, build habits, and grow daily.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" },
  heading: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "gray", textAlign: "center" },
});
