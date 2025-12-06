import type { AuthResponsePassword } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id?: string;
  session: AuthResponsePassword["data"]["session"]
  userInfos: AuthResponsePassword["data"]["user"];
  // add other user fields as needed
}
interface AppState {
  // Preferences
  theme: "light" | "dark";
  volume: number;
  setTheme: (theme: "light" | "dark") => void;
  setVolume: (vol: number) => void;

  // History (items user has viewed)
  history: string[]; // array of item IDs
  addToHistory: (id: string) => void;
  clearHistory: () => void;

  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      // Preferences
      theme: "light",
      volume: 0.5,
      setTheme: (theme) => set({ theme }),
      setVolume: (vol) => set({ volume: vol }),

      // History
      history: [],
      addToHistory: (id) =>
        set((state) => {
          const updated = [id, ...state.history.filter((h) => h !== id)];
          return { history: updated.slice(0, 50) }; // Keep last 50
        }),
      clearHistory: () => set({ history: [] }),

      // UI state
      sidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: "app-store", // localStorage key
    }
  )
);
