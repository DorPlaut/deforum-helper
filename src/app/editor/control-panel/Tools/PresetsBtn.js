import { useFramesStore } from '@/store/framesStore';
import formatStringToArray from '@/utils/formatStringToArray';
import React, { useState } from 'react';
import { BiSolidMagicWand } from 'react-icons/bi';
import getHigestValue from '@/utils/getHigestValue';

import {
  TbEaseIn,
  TbEaseInOut,
  TbEaseOut,
  TbMinusVertical,
} from 'react-icons/tb';

const PresetsBtn = () => {
  // global state
  const {
    transitionMode,
    setTrantisonMode,
    fps,
    frameCount,
    setFps,
    setFrameCount,
    setTransX,
    setTransY,
    setTransZ,
    setRotX,
    setRotY,
    setRotZ,
    transX,
    transY,
    transZ,
    rotX,
    rotY,
    rotZ,
    maxValue,
    setMaxValue,
    hoverdFrame,
  } = useFramesStore((state) => state);
  // local state
  const [isSelecting, setIsSelecting] = useState(false);
  // handle load preset file :
  const loadPresetData = async (filename) => {
    try {
      const response = await fetch(`/presets/${filename}`);
      if (!response.ok) {
        throw new Error('Failed to fetch preset data');
      }

      const fileData = await response.text();
      const jsonData = JSON.parse(fileData);

      const {
        fps,
        max_frames,
        translation_x,
        translation_y,
        translation_z,
        rotation_3d_x,
        rotation_3d_y,
        rotation_3d_z,
      } = jsonData;

      setFps(fps);
      setFrameCount(max_frames);

      const transXArray = formatStringToArray(translation_x, max_frames);
      const transYArray = formatStringToArray(translation_y, max_frames);
      const transZArray = formatStringToArray(translation_z, max_frames);
      const rotXArray = formatStringToArray(rotation_3d_x, max_frames);
      const rotYArray = formatStringToArray(rotation_3d_y, max_frames);
      const rotZArray = formatStringToArray(rotation_3d_z, max_frames);

      setTransX(transXArray);
      setTransY(transYArray);
      setTransZ(transZArray);
      setRotX(rotXArray);
      setRotY(rotYArray);
      setRotZ(rotZArray);

      setMaxValue(
        getHigestValue(
          transXArray,
          transYArray,
          transZArray,
          rotXArray,
          rotYArray,
          rotZArray
        )
      );
      setIsSelecting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="presets-btn-container">
      <button
        title="Load a preset"
        className="btn block-btn presets-btn"
        onClick={() => {
          setIsSelecting(!isSelecting);
        }}
      >
        <BiSolidMagicWand />
      </button>
      {isSelecting && (
        <ul className="presets-picker">
          <li className="preset">
            <button
              className="btn preset-btn"
              onClick={() =>
                loadPresetData('preset-rotate-around-center-right-slow.txt')
              }
            >
              Spin to the right around the center - Slow
            </button>
          </li>
          <li className="preset">
            <button
              className="btn preset-btn"
              onClick={() =>
                loadPresetData('preset-rotate-around-center-right-medium.txt')
              }
            >
              Spin to the right around the center - Medium
            </button>
          </li>
          <li className="preset">
            <button
              className="btn preset-btn"
              onClick={() =>
                loadPresetData('preset-rotate-around-center-right-fast.txt')
              }
            >
              Spin to the right around the center - Fast
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default PresetsBtn;
