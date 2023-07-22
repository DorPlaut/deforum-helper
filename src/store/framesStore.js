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
  transZ: [],
  setTransZ: (transZ) => set(() => ({ transZ })),
  rotX: [],
  setRotX: (rotX) => set(() => ({ rotX })),
  rotY: [],
  setRotY: (rotY) => set(() => ({ rotY })),
  rotZ: [],
  setRotZ: (rotZ) => set(() => ({ rotZ })),
}));
