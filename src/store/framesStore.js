import { create } from 'zustand';

export const useFramesStore = create((set) => ({
  // GENERAL SETTINGS
  // fps
  fps: 15,
  setFps: (fps) => set(() => ({ fps })),
  // max_frames
  frameCount: 150,
  setFrameCount: (frameCount) => set(() => ({ frameCount })),
  // max value
  maxValue: 10,
  setMaxValue: (maxValue) => set(() => ({ maxValue })),
  // FOV
  fov: 70,
  setFov: (fov) => set(() => ({ fov })),
  // strength
  strength: 0.65,
  setStrength: (strength) => set(() => ({ strength })),
  // near
  near: 200,
  setNear: (near) => set(() => ({ near })),
  // far
  far: 10000,
  setFar: (far) => set(() => ({ far })),

  // CHANNELS
  // channel list
  channels: [
    'translation_x',
    'translation_y',
    'translation_z',
    'rotation_3d_x',
    'rotation_3d_y',
    'rotation_3d_z',
  ],
  // add channel
  addChannel: (channel) =>
    set((state) => ({ channels: [...state.channels, channel] })),
  // remove Channel
  removeChannel: (channel) =>
    set((state) => ({ channels: state.channels.filter((c) => c !== channel) })),
// visible channel list. (ui perpese )
    VisibleChannels: [
      'translation_x',
      'translation_y',
      'translation_z',
      'rotation_3d_x',
      'rotation_3d_y',
      'rotation_3d_z','near_schedule', 'far_schedule', 'strength_schedule', 'fov_schedule','audio'
    ],
  // set Visible Channels
  
  SetVisibleChannels: (VisibleChannels) => set(() => ({ VisibleChannels })),

  // sperate state for each channel
  // movment
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
  // other settings
  // fov
  fov_schedule: [[0, 70, true]],
  setFov_schedule: (fov_schedule) => set(() => ({ fov_schedule })),
  // strength
  strength_schedule: [[0, 0.65, true]],
  setStrength_schedule: (strength_schedule) =>
    set(() => ({ strength_schedule })),
  // near
  near_schedule: [[0, 200, true]],
  setNear_schedule: (near_schedule) => set(() => ({ near_schedule })),
  // far
  far_schedule: [[0, 10000, true]],
  setFar_schedule: (far_schedule) => set(() => ({ far_schedule })),

  // TOOLS AND FEATURS
  // ui-element hoverd frame
  hoverdFrame: [0, 0, true],
  setHoverdFrame: (hoverdFrame) => set(() => ({ hoverdFrame })),

  // Transitions
  // set transition mode as string
  transitionMode: 'linear',
  setTrantisonMode: (transitionMode) => set(() => ({ transitionMode })),
}));
