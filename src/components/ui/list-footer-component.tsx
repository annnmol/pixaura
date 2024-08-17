import { ActivityIndicator, StyleSheet, View } from "react-native";

//custom imports
import { theme } from "@/src/lib/colors";

interface ListFooterComponentProps {
  dataLength?: number;
}

function ListFooterComponent({ dataLength = 20 }: ListFooterComponentProps) {
  const marginVertical = dataLength > 0 ? 20 : 50;
  return (
    <View style={[styles.container, { marginVertical }]}>
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
  },
});
