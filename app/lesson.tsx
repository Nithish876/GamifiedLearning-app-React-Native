import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function LessonScreen() {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, { duration: 1000 }),
    transform: [{ scale: withTiming(progress.value, { duration: 1000 }) }],
  }));

  useEffect(() => {
    progress.value = 1;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lesson 1</Text>
      <View style={[styles.box, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaf4fc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
});
