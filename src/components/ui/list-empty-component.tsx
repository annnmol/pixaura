import { Link, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

//custom imports
import { constants } from "@/src/lib/helpers";

function ListEmptyComponent() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Image
        source={require("@/assets/images/no-data.png")}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={styles.title}>{`Results not found.`}</Text>
      <Text style={styles.body}>
      When you have data you’ll see them here.{"\n"} Try again later.
      </Text>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Go back!</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: constants.deviceHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E9E8",
    gap: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  image: {
    width: constants.deviceWidth - 80,
    height: 220,
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
