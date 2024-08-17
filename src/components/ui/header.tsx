import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { PropsWithChildren, ReactNode, memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

//custom imports
import { constants } from "@/src/lib/helpers";
import { ThemedText, ThemedView } from "../themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { darkBackground, theme } from "@/src/lib/colors";

// // Define your context type here
// interface HeaderContextType {
//   //   name: string;
// }

// // Create a Context for the Header
// const HeaderContext = createContext<HeaderContextType | null>(null);

// // Custom Hook to access Card Context
// const useHeaderContext = () => {
//   const context = useContext(HeaderContext);
//   if (!context) {
//     throw new Error("useHeaderContext must be used within a Header component");
//   }
//   return context;
// };

// Define the Header Props
interface HeaderProps {
  children?: ReactNode;
}

// Compound Component: Header
const Header = ({ children }: HeaderProps) => {
  //   const value = useMemo(() => ({ name }), [name]); // Memoize context value
  const insets = useSafeAreaInsets();

  const paddingTop = (insets.top ?? 0) + 16;
  return (
    <ThemedView lightColor={theme.primary} darkColor={darkBackground} style={[styles.container,{paddingTop}]}>
      {/* <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider> */}
      {children}
    </ThemedView>
  );
};

// Compound Component: Header.Left
Header.Left = memo(({ children }: PropsWithChildren) => {
  return <View style={styles.left}>{children}</View>;
});

// Compound Component: Header.Center
Header.Center = memo(({ children }: PropsWithChildren) => {
  return <View style={styles.center}>{children}</View>;
});

// Compound Component: Header.Right
Header.Right = memo(({ children }: PropsWithChildren) => {
  return <View style={styles.right}>{children}</View>;
});

// Compound Component: Header.Title
Header.Title = memo(({ children }: PropsWithChildren) => {
  // const { name } = useHeaderContext();
  return (
    <ThemedText type="subtitle" numberOfLines={1} lightColor={theme.white} darkColor={theme.white}>
      {children}
    </ThemedText>
  );
});

// Compound Component: Header.LeftBack
Header.LeftBack = memo(() => {
  const router = useRouter();
  return (
    <View style={styles.left}>
      <TouchableOpacity onPress={() => router?.back()}>
        <MaterialCommunityIcons name="arrow-left" size={22} color={theme.onPrimary} />
      </TouchableOpacity>
    </View>
  );
});

// Styles for the Header Component
const styles = StyleSheet.create({
  container: {
    // height: 52,
    paddingVertical: constants.spacingM,
    paddingHorizontal: constants.spacing,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: theme.background,
    // borderColor: "grey",
    // borderWidth: 1,
  },
  left: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
  },
  center: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  right: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
  },
  title: {
    color: theme.tint,
  }
});

export default Header;
