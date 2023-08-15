'use client';
import { useFramesStore } from '@/store/framesStore';
import React, { Suspense, useEffect, useState } from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import framesToTime from '@/utils/framesToTime';
import Loading from '../../../loading';
import { BiTime } from 'react-icons/bi';
import { AiOutlineUpload } from 'react-icons/ai';

const AnimationSettingsForm = () => {
  // globals state from state store
  const {
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
  } = useFramesStore((state) => state);
  // local state
  const [tempFps, setTempFps] = useState(fps);
  const [tempFrameCount, setTempFrameCount] = useState(frameCount);
  const [time, setTime] = useState(framesToTime(fps, frameCount));

  // updated local state when fps or frameCount changes
  useEffect(() => {
    setTempFps(fps);
    setTempFrameCount(frameCount);
    setTime(framesToTime(fps, frameCount));
  }, [frameCount, fps]);

  //

  // handle count in btn

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFps(tempFps);
    setFrameCount(tempFrameCount);
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <form
          className="timeline-settings-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="inputs-container">
            <div className="fps-input">
              <label htmlFor="fps">Frame rate(fps)</label>
              <input
                max={120}
                min={10}
                type="number"
                value={tempFps}
                onChange={(e) => setTempFps(parseInt(e.target.value))}
              />
            </div>
            <div className="frames-input">
              <label htmlFor="leangh">Length (in frames)</label>
              <input
                max={5000}
                min={2}
                type="number"
                value={tempFrameCount}
                onChange={(e) => setTempFrameCount(parseInt(e.target.value))}
              />
            </div>
            {/* upload settings btn */}

            {/*  */}
          </div>
          <div className="settings-btn-container">
            <span>
              <BiTime /> : {time.slice(0, 5)}
            </span>

            <button className="btn settings-btn " type="submit">
              Update Settings
            </button>
          </div>
        </form>
      </Suspense>
    </div>
  );
};

export default AnimationSettingsForm;
