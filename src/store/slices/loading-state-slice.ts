import { StateCreator } from "zustand";

export interface LoadingStateSlice {
  loading: boolean;
  setLoading: (payload: boolean) => void;
}

export const createLoadingStateSlice: StateCreator<LoadingStateSlice> = (set) => ({
  loading: false,
  setLoading: (payload: boolean) => set({ loading: payload }),
});
