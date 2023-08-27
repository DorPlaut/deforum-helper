import { create } from 'zustand';

export const useAudioStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
  playAudio: () => set(() => ({ isPlaying: true })),
  pauseAudio: () => set(() => ({ isPlaying: false })),
  selectedAudio: null,
  setSelectedAudio: (selectedAudio) => set(() => ({ selectedAudio })),
  audioLength: 0,
  setAudioLength: (audioLength) => set(() => ({ audioLength })),
}));
