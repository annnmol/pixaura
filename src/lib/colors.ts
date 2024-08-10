/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const primary = "#128C7E";
const primaryLight = "#25D366";
const primaryDark = "#075E54";
const yellowLight = "#DCF8C6";
const pinkLight = "#ECE5DD";
const grey = "#A9ACB6";
const blue = '#1063FD';
// muted: '#3A5A92',
const background = '#EFEEF6';
const gray= '#6E6E73';
const lightGray = '#DCDCE2';
const green= '#4FEE57';
// lightGreen: '#DBFFCB';
const red = '#EF0827';
const yellow='#FCC70B';

export const colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    // tabIconDefault: '#687076',
    // tabIconSelected: tintColorLight,
    tabIconDefault: grey,
    tabIconSelected: primary,
    primary,
    primaryLight,
    primaryDark,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    // tabIconDefault: '#9BA1A6',
    // tabIconSelected: tintColorDark,
    tabIconDefault: grey,
    tabIconSelected: primary,
    primary,
    primaryLight,
    primaryDark,
  },
};
