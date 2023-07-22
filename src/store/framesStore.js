import { create } from 'zustand';

export const useFramesStore = create((set) => ({
  fps: 15,
  frameCount: 150,
  setFps: (fps) => set(() => ({ fps })),
  setFrameCount: (frameCount) => set(() => ({ frameCount })),

  transX: [],
  setTransX: (transX) => set(() => ({ transX })),
  transY: [],
  setTransY: (transY) => set(() => ({ transY })),
  transD: [],
  setTransD: (transD) => set(() => ({ transD })),
  rotX: [],
  setRotX: (roRX) => set(() => ({ rotX })),
  rotY: [],
  setRotY: (roRY) => set(() => ({ rotY })),
  rotD: [],
  setRotD: (roRD) => set(() => ({ rotD })),
}));
