import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAppState {
  theme: string;
  setTheme: (theme: string) => void;
}

const useAppStore = create<IAppState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "hzphim-app-storage",
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
);

export default useAppStore;
