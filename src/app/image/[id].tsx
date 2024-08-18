import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { ImageBackground } from "expo-image";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

//custom imports
import Header from "@/src/components/ui/header";
import { theme } from "@/src/lib/colors";
import { showHaptics } from "@/src/lib/haptics";
import { blurhash } from "@/src/lib/helpers";
import { showToast } from "@/src/lib/toast";
import { ImagesNetworkService } from "@/src/services/images-network-service";
import {
  PixImageServiceResponseType
} from "@/types/image-service";

const ImageDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["image", id],
    queryFn: () =>
      ImagesNetworkService.getImage(id as string).then(
        (res) => res as PixImageServiceResponseType
      ),
  });

  async function handleShare(url: string) {
    showHaptics("impactAsync");

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
        showToast({
          text1: "Sharing is not available on this platform",
        });
      }
    } catch (error) {
      showToast({
        text1: "Error downloading or sharing the image:",
      });
      console.error("Error downloading or sharing the image:", error);
    }
  }

  // const imageHeight = getImageHeight(image?.imageWidth, image?.imageHeight);

  if (!id) return <Redirect href="/home" />;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `image details - ${id}`,
          animation: "slide_from_bottom",
          headerShown: true,
          header: () => {
            return (
              <Header style={{ backgroundColor: "#000" }}>
                <Header.LeftBack></Header.LeftBack>
                <Header.Center>
                  <Header.Title style={{ fontSize: 20 }}>
                    Details: {id ?? "n/a"}{" "}
                  </Header.Title>
                </Header.Center>
                <Header.Right>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      handleShare(data?.hits?.[0]?.largeImageURL as string)
                    }
                  >
                    <MaterialIcons
                      name="share"
                      size={24}
                      color={theme.onPrimary}
                    />
                  </TouchableOpacity>
                </Header.Right>
              </Header>
            );
          },
        }}
      />
      {isLoading ? <ActivityIndicator size="large" color="primary" /> : null}
      <ImageBackground
        source={{ uri: data?.hits?.[0]?.largeImageURL as string }}
        style={{ flex: 1 }}
        contentFit="contain"
        placeholder={blurhash}
      />
    </View>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
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
