import { router } from "expo-router";
import { StateCreator } from "zustand";
export interface AuthSessionSlice {
  authSession: IData | null;
  setAuthSession: (payload: IData | null) => void;
  logoutAuthSession: () => void;
}

export const createAuthSessionSlice: StateCreator<AuthSessionSlice> = (
  set
) => ({
  authSession: { name: "Anmol Tanwar" },
  setAuthSession: (payload: IData | null) => {
    set({ authSession: payload });
  },
  logoutAuthSession: () => {
    set({ authSession: null });
    // router.replace('/(auth)/sign-in'); // Redirect to login page
  },
});
