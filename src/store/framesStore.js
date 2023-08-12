import { create } from 'zustand';

export const useFramesStore = create((set) => ({
  fps: 15,
  frameCount: 150,
  setFps: (fps) => set(() => ({ fps })),
  setFrameCount: (frameCount) => set(() => ({ frameCount })),

  transX: [[0, 0, true]],
  setTransX: (transX) => set(() => ({ transX })),
  transY: [[0, 0, true]],
  setTransY: (transY) => set(() => ({ transY })),
  transZ: [[0, 0, true]],
  setTransZ: (transZ) => set(() => ({ transZ })),
  rotX: [[0, 0, true]],
  setRotX: (rotX) => set(() => ({ rotX })),
  rotY: [[0, 0, true]],
  setRotY: (rotY) => set(() => ({ rotY })),
  rotZ: [[0, 0, true]],
  setRotZ: (rotZ) => set(() => ({ rotZ })),

  transitionMode: 'linear',
  setTrantisonMode: (transitionMode) => set(() => ({ transitionMode })),

  maxValue: 10,
  setMaxValue: (maxValue) => set(() => ({ maxValue })),
}));
