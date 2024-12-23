import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  bar: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
});
