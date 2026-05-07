import { create } from 'zustand';

export type PatientStatus = 'Active' | 'Pending' | 'Completed' | 'Archived';

export interface Patient {
  id: string;
  externalId: string;
  title: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  ethnicity: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  status: PatientStatus;
  createdAt: string;
}

interface PatientState {
  patients: Patient[];
  isLoading: boolean;
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'status' | 'externalId'>) => Promise<Patient>;
  updatePatient: (id: string, data: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  getPatient: (id: string) => Patient | undefined;
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [
    {
      id: '1',
      externalId: 'PT-10042',
      title: 'Mr.',
      firstName: 'James',
      lastName: 'Wilson',
      birthday: '1985-04-12',
      gender: 'Male',
      ethnicity: 'Caucasian',
      email: 'j.wilson@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA',
      status: 'Active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      externalId: 'PT-10043',
      title: 'Ms.',
      firstName: 'Elena',
      lastName: 'Rodriguez',
      birthday: '1992-08-24',
      gender: 'Female',
      ethnicity: 'Hispanic',
      email: 'erodriguez@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave',
      city: 'Miami',
      state: 'FL',
      postalCode: '33101',
      country: 'USA',
      status: 'Pending',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ],
  isLoading: false,

  addPatient: async (patientData) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPatient: Patient = {
      ...patientData,
      id: crypto.randomUUID(),
      externalId: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Active',
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      patients: [newPatient, ...state.patients],
      isLoading: false
    }));

    return newPatient;
  },

  updatePatient: async (id, data) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      patients: state.patients.map(p => p.id === id ? { ...p, ...data } : p),
      isLoading: false
    }));
  },

  deletePatient: async (id) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      patients: state.patients.filter(p => p.id !== id),
      isLoading: false
    }));
  },

  getPatient: (id) => {
    return get().patients.find(p => p.id === id);
  }
}));
