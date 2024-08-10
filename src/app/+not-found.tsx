import { Link, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

//custom imports
import { constants } from "@src/lib/helpers";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Image
        source={require("@/assets/images/error404.png")}
        style={styles.image}
        contentFit="contain"
      />
      <Text
        style={styles.title}
      >{`Oops! You weren't\nsupposed to see this.`}</Text>
      <Text style={styles.body}>
        The page you were looking was loading incorrectly.
      </Text>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Go back!</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCB82F",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  image: {
    width: constants.deviceWidth - 80,
    height: 320,
  },

  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },

  body: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
    marginVertical: 10,
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
  },

  btnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
