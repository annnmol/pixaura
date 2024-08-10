import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

//custom imports
import { useQuery } from "@tanstack/react-query";
import { ThemedText, ThemedView } from "@/src/components/themed";
import { ImagesNetworkService } from "@/src/services/images-network-service";
import { textStyles } from "@/src/components/themed/text";
import data from "@/assets/dummy/data.json";

const HomeScreen = () => {
  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["images", "search"],
  //   queryFn: async () => await ImagesNetworkService.searchImages(),
  // });

  console.log(
    `🚀 ~ file: index.tsx:25 ~ Index ~ data:`,
    // data,
    // isLoading,
    // error,
    JSON.stringify(data, null, 2)
  );
  return (
    <ThemedView style={styles.container}>
      <ThemedText>HomeScreen</ThemedText>
      <Link href="/welcome" style={textStyles.link}>
        Go to Welcomescreen
      </Link>
      <Link href="/image/452" style={textStyles.link}>
        Go to Image 452
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
