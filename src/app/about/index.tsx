import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";

//custom imports
import { ThemedText, ThemedView } from "@/src/components/themed";
import { theme } from "@/src/lib/colors";
import { ImagesNetworkService } from "@/src/services/images-network-service";

const id = "annnmol";

export interface IGithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: any;
  blog: string;
  location: any;
  email: any;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

const AboutScreen = () => {
  const { data } = useQuery({
    queryKey: ["github", id],
    queryFn: () =>
      ImagesNetworkService.getGithubUser(id as string).then(
        (res) => res as IGithubUser
      ),
  });
  console.log(
    `🚀 ~ file: index.tsx:54 ~ AboutScreen ~ data:`,
    JSON.stringify(data, null, 3)
  );
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "About",
          animation: "slide_from_right",
          headerTitleAlign: "center",
        }}
      />
      <ThemedText type="subtitle">Hey Batman 👋</ThemedText>

      <ThemedView themeKey="card" style={styles.card}>
        <Image source={{ uri: data?.avatar_url }} style={styles.image} />
        <ThemedText type="defaultSemiBold">{data?.name}</ThemedText>
        <ThemedText type="caption" style={{ textAlign: "center" }}>
        I hold a B.Tech degree in Computer Science and have basic knowledge about programming languages bringing over 2.9 years of expertise as a SDE.
        </ThemedText>
        <ThemedText type="caption" style={{ textAlign: "center" }}>
          I specialize in building seamless apps using React.js, Next.js, React Native, Node.js.
        </ThemedText>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => Linking.openURL(data?.blog ?? "")}>
            <ThemedText type="link">
              <MaterialCommunityIcons
                name="linkedin"
                size={20}
                color={theme.onPrimary}
              />{" "}
              LinkedIn
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(data?.url ?? "")}>
            <ThemedText type="link">
              <MaterialCommunityIcons
                name="github"
                size={20}
                color={theme.onPrimary}
              />{" "}
              Github
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
      <ThemedText type="caption">
        Crafted with ❤️ by Anmol in Jaipur.
      </ThemedText>
    </ThemedView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    gap: 12,
    marginTop: 60,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
});
