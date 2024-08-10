import { ThemedText, ThemedView } from "@/src/components/themed";
import { textStyles } from "@/src/components/themed/text";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

//custom imports
// import { ThemedText, ThemedView } from "../components/themed";
// import { textStyles } from "../components/themed/text";

const WelcomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>WelcomeScreenvvv</ThemedText>
          <Link href="/home" style={textStyles.link}>
        Go to homescreen
      </Link>
    </ThemedView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
