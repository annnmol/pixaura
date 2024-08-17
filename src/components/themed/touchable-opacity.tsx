import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { ThemeKeys } from "@/src/lib/colors";

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  themeKey?: ThemeKeys;
};

export function ThemedTouchableOpacity({
  style,
  lightColor,
  darkColor,
  themeKey = "background",
  ...otherProps
}: ThemedTouchableOpacityProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    themeKey
  );

  return (
    <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
