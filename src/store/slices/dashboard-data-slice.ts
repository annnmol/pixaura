import { StateCreator } from "zustand";

export interface DashboardDataSlice {
  fishes: number;
  addFish: () => void;
  resetDashboardData: () => void;
}

export const createDashboardSliceSlice: StateCreator<DashboardDataSlice> = (set) => ({
  fishes: 4,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
  resetDashboardData: () => set({ fishes: 0 }),
});
