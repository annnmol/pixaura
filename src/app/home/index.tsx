import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

//custom imports
import { useQuery } from "@tanstack/react-query";
import { ThemedText, ThemedView } from "@/src/components/themed";
import { DummyNetworkService } from "@/src/services/dummy-network-service";

const HomeScreen = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["flights", "all"],
    queryFn: async () =>
      await DummyNetworkService.getAllFlights(),
  });

  console.log(`🚀 ~ file: home.tsx:18 ~ HomeScreen ~ data:`, data);
  return (
    <ThemedView style={styles.container}>
      <ThemedText>HomeScreen</ThemedText>
      <Link href="/welcome" asChild>
        <ThemedText type="link">Go to Welcomescreen</ThemedText>
      </Link>
      <Link href="/image/452" asChild>
        <ThemedText type="link">Go to Image 452</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
