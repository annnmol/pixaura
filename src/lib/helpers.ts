import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet
} from "react-native";

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

export const blurhash = "LCI}-S^wEMNF58t7x[t8.m?bnOaf";

export function widthPercentage(p: number): number {
  return (deviceWidth * p) / 100;
}

export function heightPercentage(p: number): number {
  return (deviceHeight * p) / 100;
}


export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  } as T & { cancel: () => void };

  debounced.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

export function formatUrlParams(
  params: Record<string, string>,
  keysToEncode: string[] = []
) {
  return Object.keys(params)
  .filter((key) => params[key]) // Filter out keys with undefined values
    .map((key) => {
      const value = keysToEncode.includes(key)
        ? encodeURIComponent(params[key])
        : params[key];
      return `${key}=${value}`;
    })
    .join("&");
}
