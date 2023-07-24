'use client';
import { useFramesStore } from '@/store/framesStore';
import React, { useState } from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import framesToTime from '@/utils/framesToTime';

const Form = () => {
  // data
  const { fps, frameCount, setFps, setFrameCount } = useFramesStore(
    (state) => state
  );
  // local state
  const [tempFps, setTempFps] = useState(fps);
  const [tempFrameCount, setTempFrameCount] = useState(frameCount);
  const [tempTime, setTempTime] = useState(framesToTime(fps, frameCount));
  const [countIn, setCountIn] = useState('frames');

  // handle count in btn
  const handleCountIn = (e) => {
    e.preventDefault();
    if (countIn === 'frames') {
      setCountIn('time');
    } else {
      setCountIn('frames');
    }
  };

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
              max={120}
              min={1}
              type="number"
              value={tempFps}
              onChange={(e) => setTempFps(parseInt(e.target.value))}
            />
          </div>
          <div className="frames-input">
            <label htmlFor="leangh">
              Length (in {countIn === 'frames' ? 'frames' : 'time'}){' '}
              {/* <button
                className="btn  time-frames-btn"
                type="button"
                onClick={(e) => handleCountIn(e)}
              >
                <BsArrowRepeat />
              </button> */}
            </label>
            <input
              max={2000}
              min={1}
              type="number"
              value={countIn === 'frames' ? tempFrameCount : tempTime}
              onChange={(e) =>
                countIn === 'frames'
                  ? setTempFrameCount(parseInt(e.target.value))
                  : setTempTime(e.target.value)
              }
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
