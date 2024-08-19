import { Dispatch, SetStateAction } from "react";
import { StateCreator } from "zustand";

export interface IFilters {
  q: string;
  image_type: string;
  category: string;
  colors: string;
  editors_choice: ""| "true" | "false";
  safesearch: "" | "true" | "false";
  order: "" | "popular" | "latest";
}

export const defaultFilters: IFilters = {
  q: "",
  image_type: "photo",
  category: "",
  colors: "",
  order: "popular",
  editors_choice: "true",
  safesearch: "true",
};

export interface HomeDataSlice {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  resetHomeData: () => void;
}

export const createHomeDataSlice: StateCreator<HomeDataSlice> = (set) => ({
  filters: defaultFilters,
  // setFilters: (payload: IFilters) => {
  //   set({ filters: payload });
  // },
  // setState function that works like React's setState
  setFilters: (payload: React.SetStateAction<IFilters>) => {
    set((state) => ({
      filters: typeof payload === "function" ? payload(state.filters) : payload,
    }));
  },
  resetHomeData: () => set({ filters: defaultFilters }),
});
