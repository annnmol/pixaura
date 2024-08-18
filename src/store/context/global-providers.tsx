import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, createContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

//custom imports
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { queryClient } from "@/src/lib/tanstack-query";
import { toastConfig } from "@/src/lib/toast";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

interface IGlobalContext {
  // authUser: IData | undefined;
  // handleAuthChange: (data: IData) => void;
}

export const GlobalContext = createContext({
  // authUser: undefined,
  // handleAuthChange: (data: IData) => undefined,
} as IGlobalContext);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  // const [authUser, setAuthUser] = useState(parsedItem);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalContext.Provider value={{}}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            <Toast config={toastConfig} />
          </QueryClientProvider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </GestureHandlerRootView>
  );
};
