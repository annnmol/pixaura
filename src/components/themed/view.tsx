import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { ThemeKeys } from "@/src/lib/colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  themeKey?: ThemeKeys;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  themeKey = "background",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    themeKey
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
