import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import {
  Alert,
  Appearance,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";

//custom imports
import { theme } from "@/src/lib/colors";
import { reloadAppAsync } from "expo";

export function ToggleTheme() {
  const currentColorScheme = useColorScheme() ?? "light";

  useEffect(() => {
    // Set up the AppearanceListener
    const subscription = Appearance.addChangeListener(() => {
      reloadAppAsync();
    });

    // Cleanup function to remove the listener
    return () => {
      subscription.remove();
    };
  }, []);

  function handlePress() {
    Alert.alert(
      "Change Theme",
      "Please change the system theme via the device settings or the notification bar to switch themes. And then restart the app.",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
        { text: "Restart", onPress: () => reloadAppAsync() },
      ]
    );
  }

  return (
    <View>
      <MaterialIcons
        name={currentColorScheme === "dark" ? "dark-mode" : "light-mode"}
        onPress={handlePress}
        size={24}
        color={theme.onPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
