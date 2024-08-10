import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

//custom imports
import { ThemedText, ThemedView } from "@/src/components/themed";
import { textStyles } from "@/src/components/themed/text";
import { blurhash } from "@/src/lib/helpers";

const WelcomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/travel.jpeg")}
        style={{ width: 400, height: 800 }}
        contentFit="contain"
        placeholder={blurhash}
      />
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
    // backgroundColor: "#e5e5e5",
  },
});
