import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

//custom imports
import { ThemedText, ThemedView } from "@/src/components/themed";

const ImageDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `image details - ${id}`, }} />
      <ThemedText>ImageDetailsScreen----- {id ?? "n/a"}</ThemedText>
    </ThemedView>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
