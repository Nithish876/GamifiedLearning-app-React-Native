import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import quizData from "../data/quiz.json";
import ConfettiCannon from "react-native-confetti-cannon";
import { Audio } from "expo-av";
import AnimatedButton from "@/components/AnimatedButton";
import { router } from "expo-router";

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const confettiRef = useRef<any>(null);

  const successSound = useRef<Audio.Sound | null>(null);
  const errorSound = useRef<Audio.Sound | null>(null);

  React.useEffect(() => {
    const loadSounds = async () => {
      successSound.current = new Audio.Sound();
      errorSound.current = new Audio.Sound();

      await successSound.current.loadAsync(require("../assets/success.mp3"));
      await errorSound.current.loadAsync(require("../assets/error.mp3"));
    };

    loadSounds();

    return () => {
      successSound.current?.unloadAsync();
      errorSound.current?.unloadAsync();
    };
  }, []);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleChoicePress = async (index: number) => {
    setSelectedChoice(index);
    if (index === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      confettiRef.current?.start();
      await successSound.current?.replayAsync();
    } else {
      await errorSound.current?.replayAsync();
    }
  };

  const handleNextQuestion = () => {
    setSelectedChoice(null);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isQuizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Finished!</Text>
        <Text style={styles.score}>Your Score: {score}/{quizData.length}</Text>
        <AnimatedButton text="Go Home" onPress={()=>router.push('/')}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.choiceButton,
            selectedChoice === index && styles.selectedChoice,
          ]}
          onPress={() => handleChoicePress(index)}
        >
          <Text style={styles.choiceText}>{choice}</Text>
        </TouchableOpacity>
      ))}
      {selectedChoice !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      )}
      <ConfettiCannon ref={confettiRef} count={200} origin={{ x: -10, y: 0 }} fadeOut />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  selectedChoice: {
    backgroundColor: "#6c63ff",
  },
  choiceText: {
    fontSize: 16,
    color: "#333",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  score: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
});

export default QuizScreen;
