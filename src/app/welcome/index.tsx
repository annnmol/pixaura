import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

//custom imports
import { ThemedButton } from "@/src/components/themed";
import { textStyles } from "@/src/components/themed/text";
import {
  blurhash,
  constants,
  heightPercentage,
  widthPercentage,
} from "@/src/lib/helpers";

const WelcomeScreen = () => {
  const router = useRouter();

  function handleStartPress() {
    router.replace("/home");
  }
  return (
    <ImageBackground
      source={require("@/assets/images/travel.jpeg")}
      style={styles.image}
      placeholder={blurhash}
    >
      {/* Linear Gradient */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.container}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "rgba(255,255,255,0.8)",
            "rgba(255,255,255,1)",
          ]}
          start={[0.5, 0]}
          end={[0.5, 0.8]}
          style={styles.gradient}
        />

        <View style={styles.contentBox}>
          <Animated.Text
            entering={FadeInDown.delay(200).springify()}
            style={textStyles.title}
          >
            Pixaura
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(300).springify()}
            style={textStyles.defaultSemiBold}
          >
            Your daily dose of visual vitamin D.
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.btnContainer}
          >
            <ThemedButton
              textType="defaultSemiBold"
              style={styles.btn}
              onPress={handleStartPress}
            >
              Get Started
            </ThemedButton>
          </Animated.View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {},
  gradient: {
    width: widthPercentage(100),
    height: heightPercentage(60),
    position: "absolute",
    bottom: 0,
  },
  contentBox: {
    justifyContent: "center",
    alignItems: "center",
    gap: constants.spacing,
    zIndex: 1,
    padding: constants.spacingL,
    paddingBottom: constants.spacingLXX,
    backgroundColor: "#fff",
  },
  btnContainer: {
    width: "100%",
  },
  btn: {
    width: "100%",
  },
});
