import { create } from "zustand";

const useStore = create((set) => ({
  token: "",
  setToken: (value) => set((state) => ({ ...state, token: value })),
  userName: "",
  setUserName: (value) => set((state) => ({ ...state, userName: value })),
  menuCheckNumber: "",
  setMenuCheckNumber: (value) =>
    set((state) => ({ ...state, menuCheckNumber: value })),
}));

export default useStore;
