import { GestureResponderEvent, StyleSheet } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

//custom imports
import { theme } from "@/src/lib/colors";
import { ThemedText } from "../themed";
import { textStyles } from "../themed/text";
import { ThemedTouchableOpacity } from "../themed/touchable-opacity";

interface HomeCategoryChipProps {
  item: string;
  index: number;
  isActive?: boolean;
  onPress?:
    | ((event: GestureResponderEvent, item: string, index: number) => void)
    | undefined;
}

function HomeCategoryChip({
  item,
  index,
  isActive,
  onPress,
}: HomeCategoryChipProps) {
  const backgroundColor = isActive ? theme.primary : theme.card;
  const color = isActive ? theme.onPrimary : theme.text;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 50)
        .duration(800)
        .springify()
        .damping(12)}
    >
      <ThemedTouchableOpacity
        themeKey="card"
        activeOpacity={0.6}
        style={[styles.listItemContainer, { backgroundColor }]}
        onPress={(event) => onPress?.(event, item, index)} // Corrected here
      >
        <ThemedText
          style={[textStyles.defaultSemiBold, styles.text, { color }]}
        >
          {item}
        </ThemedText>
      </ThemedTouchableOpacity>
    </Animated.View>
  );
}

export default HomeCategoryChip;

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 50,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});
