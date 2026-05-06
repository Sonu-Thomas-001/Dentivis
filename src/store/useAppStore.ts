import { create } from 'zustand';

interface AppState {
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
  scrollVelocity: number;
  setScrollVelocity: (velocity: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  scrollVelocity: 0,
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),
}));
