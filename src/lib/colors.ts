/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

import { Appearance } from "react-native";

export const colorScheme = Appearance.getColorScheme() ?? "light";

const tintColorLight = "#128C7E";
const tintColorDark = "#fff";
const primary = "#128C7E";
const primaryDark = "#075E54";

export const lightBackground = "#ECEDEE";
export const darkBackground = "#151718";
export const lightText = "#11181C";
export const darkText = "#ECEDEE";

const green = "#4FEE57";
const red = "#EF0827";
const yellow = "#FCC70B";

export const colors = {
  light: {
    text: lightText,
    background: lightBackground,
    card: "#fff",
    // background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: primary,
    primaryDark: primaryDark,
    onPrimary: "#ECEDEE",
    red: red,
    green: green,
    yellow: yellow,
    white: "#ffffff",
  },
  dark: {
    text: darkText,
    background: darkBackground,
    card: "#121212",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: primary,
    primaryDark: primaryDark,
    onPrimary: "#ECEDEE",
    red: red,
    green: green,
    yellow: yellow,
    white: "#ffffff",
  },
};

export type ThemeKeys = keyof typeof colors.light & keyof typeof colors.dark;

export const theme = colors[colorScheme];

export function getThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof colors.light & keyof typeof colors.dark
) {
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[colorScheme][colorName];
  }
}
