import React from 'react';
import ZoomFader from './ZoomFader';
import { useFramesStore } from '@/store/framesStore';
import {
  AiOutlineCopy,
  AiOutlineDownload,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BiCube, BiRefresh, BiSolidMagicWand } from 'react-icons/bi';
import axios from 'axios';
import formatArrayToString from '@/utils/formatArrayToString';
import formatStringToArray from '@/utils/formatStringToArray';
import Link from 'next/link';
import { TbEaseIn } from 'react-icons/tb';
import { BsFillTrash3Fill } from 'react-icons/bs';
import TransitionsPicker from './TransitionsPicker';
import getHigestValue from '@/utils/getHigestValue';
import framesToTime from '@/utils/framesToTime';
import PresetsBtn from './PresetsBtn';

const ToolsPanel = ({ zoom, setZoom }) => {
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
  } = useFramesStore((state) => state);

  return (
    <div className="editor-control-panel">
      <h3 className="panel-title">Tools</h3>
      {/* Left Controls */}
      <div className="control-buttons">
        {/* zoom fader */}
        <ZoomFader zoom={zoom} setZoom={setZoom} />
      </div>
      <br />

      {/* Middle controls */}
      <div className="control-buttons">
        {/* reset btn  */}
        <button
          title="Start over"
          className="btn block-btn reset-btn"
          onClick={() => {
            window.location.reload(false);
          }}
        >
          <BiRefresh />
        </button>

        {/* max value input */}
        {/* <div className="max-value-input">
          <input
            type="number"
            max={30}
            min={1}
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </div> */}

        {/* 3d live mode btn */}
        <Link
          className="btn block-btn btn-3d "
          href={'/livedemo'}
          title="Live view your timeline animation"
        >
          <span>3D</span>
          <BiCube />
        </Link>

        {/* transition mode button */}
        <TransitionsPicker />

        {/* presets */}
        <PresetsBtn />
      </div>
      <br />
      {/* Time display */}
      <div className="time-display">
        {transX.length >= hoverdFrame ? (
          <span> {framesToTime(fps, transX[hoverdFrame][0])}</span>
        ) : (
          <span> 00:00:000</span>
        )}
      </div>
      {/*  */}
    </div>
  );
};

export default ToolsPanel;
