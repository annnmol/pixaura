import { ActivityIndicator, StyleSheet, View } from "react-native";

//custom imports
import { theme } from "@/src/lib/colors";

function ListFooterComponent() {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
}

export default ListFooterComponent;

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
