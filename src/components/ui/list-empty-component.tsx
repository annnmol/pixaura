import { Image } from "expo-image";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

//custom imports
import { constants } from "@/src/lib/helpers";
import { ThemedText } from "../themed";
import { textStyles } from "../themed/text";

function ListEmptyComponent() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Image
        source={require("@/assets/images/no-data.png")}
        style={styles.image}
        contentFit="contain"
      />
      <ThemedText style={textStyles.subtitle}>{`No results found.`}</ThemedText>
      <ThemedText style={textStyles.caption}>
      When you have data you’ll see them here.{"\n"}
      </ThemedText>
    </View>
  );
}

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  image: {
    width: constants.deviceWidth - 80,
    height: 200,
    marginTop: 50,

  },

  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 12,

  },

  body: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
    // marginVertical: 2,
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
