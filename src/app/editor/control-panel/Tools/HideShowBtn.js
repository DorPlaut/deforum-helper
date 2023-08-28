import { useFramesStore } from '@/store/framesStore';
import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

const HideShowBtn = () => {
  // global state
  const { SetVisibleChannels } = useFramesStore((state) => state);
  const [isSelected, setIsSelected] = useState(false);
  return (
    <>
      <button
        title="Hide all channels - Hide channels for better preformance on big projects"
        className="btn block-btn presets-btn"
        onClick={() => {
          if (!isSelected) SetVisibleChannels([]);
          if (isSelected)
            SetVisibleChannels([
              'translation_x',
              'translation_y',
              'translation_z',
              'rotation_3d_x',
              'rotation_3d_y',
              'rotation_3d_z',
              'near_schedule',
              'far_schedule',
              'strength_schedule',
              'fov_schedule',
              'audio',
            ]);
          setIsSelected(!isSelected);
        }}
      >
        {isSelected ? <BiShow /> : <BiHide />}
      </button>
    </>
  );
};

export default HideShowBtn;
