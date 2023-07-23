'use client';
import { useFramesStore } from '@/store/framesStore';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const Form = () => {
  // data
  const { fps, frameCount, setFps, setFrameCount } = useFramesStore(
    (state) => state
  );
  // local state
  const [tempFps, setTempFps] = useState(fps);
  const [tempFrameCount, setTempFrameCount] = useState(frameCount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFps(tempFps);
    setFrameCount(tempFrameCount);
  };

  return (
    <div className="form-container">
      <form
        className="timeline-settings-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="inputs-container">
          <div className="fps-input">
            <label htmlFor="fps">Frame rate(fps)</label>
            <input
              type="number"
              value={tempFps}
              onChange={(e) => setTempFps(parseInt(e.target.value))}
            />
          </div>
          <div className="frames-input">
            <label htmlFor="leangh">Length (frame count)</label>
            <input
              type="number"
              value={tempFrameCount}
              onChange={(e) => setTempFrameCount(parseInt(e.target.value))}
            />
          </div>
        </div>
        <button className="btn block-btn" type="submit">
          Update Timeline Settings
        </button>
      </form>
    </div>
  );
};

export default Form;
