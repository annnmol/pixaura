import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Toast, { ToastShowParams } from "react-native-toast-message";

//custom imports
import { textStyles } from "./text";

Toast.show({
  // type: 'error', // 'success | 'error' | 'info'
  position: "bottom",
  // text1: 'Notification',
  text1:
    "A pikachu appeared nearby ! anmol singh tanwar bhai shab kaisha hai yar tu toh acha banda hai na bhut fir kya hua",
  // text1: 'A pikachu appeared nearby ! ',
  bottomOffset: 64,
  visibilityTime: 2000, // 4 seconds
  autoHide: true, // Automatically dismiss the toast
});

export function showToast(params: ToastShowParams) {
  return Toast.show({
      ...params,
      type: params?.type ?? "info", // 'success | 'error' | 'info'
      position: params?.position ?? "bottom",
      bottomOffset: params?.bottomOffset ?? 64,
      visibilityTime: params?.visibilityTime ?? 2000, // 2 seconds
      autoHide: true, // Automatically dismiss the toast
  });
}

/*
  1. Create the config
  2. Pass the config as prop to the Toast component instance
*/
export const toastConfig = {
  success: ({ text1 }: any) => {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/favicon.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={[textStyles.caption, styles.text1]} numberOfLines={2}>
          {text1}
        </Text>
      </View>
    );
  },

  error: ({ text1 }: any) => {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/favicon.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={[textStyles.caption, styles.text1]} numberOfLines={2}>
          {text1}
        </Text>
      </View>
    );
  },

  info: ({ text1 }: any) => {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/favicon.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={[textStyles.caption, styles.text1]} numberOfLines={2}>
          {text1}
        </Text>
      </View>
    );
  },
};
const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  text1: {
    color: "#fff",
  },
  logo: {
    width: 18,
    height: 18,
  },
  success: {
    backgroundColor: "#03A65A",
  },
  error: {
    backgroundColor: "#F63E50",
  },
  info: {
    backgroundColor: "#739BE5",
  },
});
