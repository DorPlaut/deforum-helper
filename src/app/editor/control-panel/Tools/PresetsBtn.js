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
    fps,
    frameCount,
    setFps,
    setFrameCount,
    transX,
    setTransX,
    transY,
    setTransY,
    transZ,
    setTransZ,
    rotX,
    setRotX,
    rotY,
    setRotY,
    rotZ,
    setRotZ,
    maxValue,
    setMaxValue,
    hoverdFrame,
    near,
    setNear,
    far,
    setFar,
    fov,
    setFov,
    strength,
    setStrength,
    fov_schedule,
    strength_schedule,
    near_schedule,
    far_schedule,
    setFov_schedule,
    setStrength_schedule,
    setNear_schedule,
    setFar_schedule,
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
      const fovArray = formatStringToArray(jsonData.fov_schedule, max_frames);
      const strengthArray = formatStringToArray(
        jsonData.strength_schedule,
        max_frames
      );
      const nearArray = formatStringToArray(jsonData.near_schedule, max_frames);
      const farArray = formatStringToArray(jsonData.far_schedule, max_frames);

      setTransX(transXArray);
      setTransY(transYArray);
      setTransZ(transZArray);
      setRotX(rotXArray);
      setRotY(rotYArray);
      setRotZ(rotZArray);
      setFov_schedule(fovArray);
      setStrength_schedule(strengthArray);
      setNear_schedule(nearArray);
      setFar_schedule(farArray);

      setFov(fovArray[0][1]);
      setStrength(strengthArray[0][1]);
      setFar(farArray[0][1]);
      setNear(nearArray[0][1]);

      setMaxValue(
        getHigestValue([
          transXArray,
          transYArray,
          transZArray,
          rotXArray,
          rotYArray,
          rotZArray,
        ])
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
