import { StateCreator } from 'zustand'


export interface SharedSlice {
  addBoth: () => void
  getBoth: () => void
}

export const createSharedSlice: StateCreator<
//   BearSlice & FishSlice,
//   [],
//   [],
  any
> = (set, get) => ({
//   addBoth: () => {
//     // you can reuse previous methods
//     get().addBear()
//     get().addFish()
//     // or do them from scratch
//     // set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
//   },
//   getBoth: () => get()?.bears + get()?.fishes,
  getBoth: () => get()?.fishes,
})
