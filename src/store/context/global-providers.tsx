import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, createContext } from "react";
//custom imports
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { queryClient } from "@/src/lib/tanstack-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </GestureHandlerRootView>
  );
};
