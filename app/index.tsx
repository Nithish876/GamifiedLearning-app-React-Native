import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AnimatedButton from "@/components/AnimatedButton";
import ProgressBar from "@/components/ProgressBar";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gamified Learning App</Text>
      <ProgressBar progress={0.5} />
      <AnimatedButton
        text="Start Lesson 1"
        onPress={() => router.push("/quiz")}
      />
      <Text style={styles.footerMsg}>Made With Love By Nithish</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footerMsg:{
    textAlign:'center', 
    position:'absolute',
    bottom:16,
    marginBottom:15
  }
});
