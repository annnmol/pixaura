import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { ThemeKeys } from "@/src/lib/colors";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  themeKey?: ThemeKeys;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "caption"
    | "heading";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  themeKey = "text",
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, themeKey);

  const combinedStyles = [{ color }, textStyles[type], style];

  return <Text style={combinedStyles} {...rest} />;
}

export const textStyles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "InterBold",
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: "InterBold",
    letterSpacing: 0.25,
  },
  heading: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: "InterBold",
    letterSpacing: 0.25,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "InterBold",
    letterSpacing: 0.25,
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    fontFamily: "Inter",
    // color: "#0a7ea4",
    color: "royalblue",
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
});
