import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

//custom imports
import { ThemedText } from "@/src/components/themed";
import Header from "@/src/components/ui/header";
import { blurhash } from "@/src/lib/helpers";
import { ImagesNetworkService } from "@/src/services/images-network-service";

const ImageDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["image", id],
    queryFn: async () => await ImagesNetworkService.getImage(id as string),
  });

  async function handleShare(url: string) {
    try {
      // Check if FileSystem.documentDirectory is not null
      if (!FileSystem.documentDirectory) {
        console.error("File system error: document directory is unavailable.");
        return;
      }

      // Step 2: Download the image to a local URI
      const { uri: localUri } = await FileSystem.downloadAsync(
        url,
        FileSystem?.documentDirectory + url.split("/").pop()
      );

      // Step 3: Share the downloaded image
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(localUri);
      } else {
        console.log("Sharing is not available on this platform");
      }
    } catch (error) {
      console.error("Error downloading or sharing the image:", error);
    }
  }

  if (!id) return <Redirect href="/home" />;

  return (
    <View style={styles.container}>
      {/* <BlurView intensity={100} tint="dark" style={styles.blur}> */}
      <Stack.Screen
        options={{
          title: `image details - ${id}`,
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
      />
      <Header>
        <Header.LeftBack></Header.LeftBack>
        <Header.Center>
          <Header.Title>Details: {id ?? "n/a"} </Header.Title>
        </Header.Center>
      </Header>
      <View style={styles.box}>
        {isLoading ? <ActivityIndicator size="large" color="primary" /> : null}
        <Image
          source={{ uri: data?.hits?.[0]?.webformatURL as string }}
          style={styles.image}
          contentFit="cover"
          placeholder={blurhash}
          transition={100}
        />
        <ThemedText lightColor="#fff">
          ImageDetailsScreen----- {id ?? "n/a"}
        </ThemedText>

        <View style={styles.actionBox}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={() => handleShare(data?.hits?.[0]?.webformatURL as string)}
          >
            <MaterialIcons name="share" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* </BlurView> */}
    </View>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 16,
  },

  actionBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
    width: "100%",
  },

  btn: {
    height: 52,
    width: 52,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});
