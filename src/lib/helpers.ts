import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const constants = {
  spacingLXX: 32,
  spacingLX: 24,
  spacingL: 20,
  spacing: 16,
  spacingM: 12,
  spacingS: 8,
  spacingSX: 4,
  spacingSXX: 2,
  statusBarHeight: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
  deviceWidth,
  deviceHeight,
  borderRadius: 8,
  borderWidth: StyleSheet.hairlineWidth,
};

export const blurhash ="LCI}-S^wEMNF58t7x[t8.m?bnOaf";

export function widthPercentage(p: number): number {
  return (deviceWidth * p) / 100;
}

export function heightPercentage(p: number): number {
  return (deviceHeight * p) / 100;
}
