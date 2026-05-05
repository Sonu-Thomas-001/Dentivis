import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  activePatientId: string | null;
  setActivePatientId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: { id: "1", name: "Dr. Sarah Chen", email: "sarah@dentivis.app", role: "ORTHODONTIST" }, // Mock data for preview
  setUser: (user) => set({ user }),
  activePatientId: null,
  setActivePatientId: (activePatientId) => set({ activePatientId }),
}));
