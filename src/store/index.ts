import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  AuthSessionSlice,
  createAuthSessionSlice,
} from "./slices/auth-session-slice";
import { HomeDataSlice, createHomeDataSlice } from "./slices/home-data-slice";
import {
  LoadingStateSlice,
  createLoadingStateSlice,
} from "./slices/loading-state-slice";
import { SharedSlice, createSharedSlice } from "./slices/shared-slice";
import {
  SystemDataSlice,
  createSystemDataSlice,
} from "./slices/system-data-slice";

export const useAppStore = create<
  LoadingStateSlice &
    AuthSessionSlice &
    SharedSlice &
    HomeDataSlice &
    SystemDataSlice
>()(
  persist(
    (...a) => ({
      ...createAuthSessionSlice(...a),
      ...createLoadingStateSlice(...a),
      ...createSharedSlice(...a),
      ...createHomeDataSlice(...a),
      ...createSystemDataSlice(...a),
    }),
    {
      name: "wabo-auth-session",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        authSession: state.authSession, // Persist only authSession
      }),
    }
  )
);

//***ACCESSING STORE OUTSIDE OF COMPONENT
// unstable_batchedUpdates
// import { unstable_batchedUpdates } from "react-native";
// unstable_batchedUpdates(() => {
//     useAppStore.getState().setAuthSession({ name: "123" });
// });
