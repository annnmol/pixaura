import { SafeAreaView, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//custom imports
import { useThemeColor } from "@/src/hooks/useThemeColor";

export type ThemedSafeAreaViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedSafeAreaViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top ?? 0;

  return (
    <SafeAreaView
      style={[{ backgroundColor, paddingTop }, style]}
      {...otherProps}
    />
  );
}
