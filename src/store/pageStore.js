import { create } from 'zustand';

export const usePageStore = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));
