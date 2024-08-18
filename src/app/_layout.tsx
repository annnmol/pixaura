import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-reanimated";

// LogBox.ignoreLogs([
//   '[Reanimated] Reduced motion setting is enabled on this device.',
// ]);

//custom imports
import { GlobalContextProvider } from "@/src/store/context/global-providers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    InterLight: require("../../assets/fonts/Inter-Light.ttf"),
    Inter: require("../../assets/fonts/Inter-Regular.ttf"),
    InterBold: require("../../assets/fonts/Inter-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalContextProvider>
    <Stack screenOptions={{headerShown:false}} initialRouteName="home"/>
    </GlobalContextProvider>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};
