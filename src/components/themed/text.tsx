import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "caption";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

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
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "InterBold",
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
