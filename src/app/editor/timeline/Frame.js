import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useEffect, useState } from 'react';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlinePoweroff,
} from 'react-icons/ai';
import FrameFader from './FrameFader';

const Frame = ({
  zoom,
  isAnchor,
  selected,
  getFrameHeight,
  frame,
  frames,
  setFrames,
  index,
}) => {
  const { fps } = useFramesStore((state) => state);
  // COLORS
  const [green, setGreen] = useState('');
  const [red, setRed] = useState('');
  // get css var value
  useEffect(() => {
    if (document) {
      setGreen(
        getComputedStyle(document.documentElement).getPropertyValue('--green')
      );
      setRed(
        getComputedStyle(document.documentElement).getPropertyValue('--red')
      );
    }
  }, []);
  const max = 10;
  const min = -10;

  //
  // handle increes value
  const increesValue = (increment) => {
    // update frame value
    const newFrames = [...frames];
    if (frame[1] + increment <= max) {
      newFrames[index][1] = parseFloat((frame[1] + increment).toFixed(2));
      if (newFrames[index].length === 2) {
        newFrames[index].push(true);
      }
      setFrames(newFrames);
      getFrameHeight(frame);
    }
  };
  // handle decrees value
  const decreesValue = (decrement) => {
    // update frame value
    const newFrames = [...frames];
    if (frame[1] - decrement >= min) {
      newFrames[index][1] = parseFloat((frame[1] - decrement).toFixed(2));
      if (newFrames[index].length === 2) {
        newFrames[index].push(true);
      }
      setFrames(newFrames);
    }
  };
  // set value with input
  const setValue = (value) => {
    const numericValue = parseFloat(value);
    // update frame value
    const newFrames = [...frames];
    if (value <= max && value >= min) {
      newFrames[index][1] = parseFloat(numericValue.toFixed(2));
      if (newFrames[index].length === 2) {
        newFrames[index].push(true);
      }
      setFrames(newFrames);
    }
  };
  // timer for on mouse down / touch down
  const [timer, setTimer] = useState(null);

  // is editing valeu
  const [isEditMode, setIsEditMode] = useState(false);
  const [temporeryValue, setTemporeryValue] = useState(frame[1]);
  const stopTimer = () => {
    clearInterval(timer);
  };

  return (
    <div
      title={`frame:${frame[0]} time:${framesToTime(fps, frame[0])}`}
      className="frame"
      style={{ width: `${zoom}px`, border: zoom < 15 && 'none' }}
    >
      {selected && (
        <>
          {index > 0 && (
            <button
              className="btn on-off-btn"
              style={{
                background: isAnchor ? green : red,

                opacity: isAnchor && 1,
              }}
              onClick={() => {
                const newFrames = [...frames];
                if (newFrames[index].length === 2) {
                  newFrames[index].push(true);
                } else if (newFrames[index].length === 3) {
                  newFrames[index].pop();
                  newFrames[index][1] = 0;
                }
                setFrames(newFrames);
                getFrameHeight(frame);
              }}
            >
              <AiOutlinePoweroff />
            </button>
          )}

          {isAnchor && (
            <>
              <button
                className="btn up-btn"
                onClick={() => increesValue(0.01)}
                onMouseDown={() => {
                  setTimer(
                    setInterval(() => {
                      increesValue(0.5);
                    }, 150)
                  );
                }}
                onTouchStart={() => {
                  setTimer(
                    setInterval(() => {
                      increesValue(0.5);
                    }, 150)
                  );
                }}
                onMouseUp={stopTimer}
                onMouseLeave={stopTimer}
                onTouchEnd={stopTimer}
                onTouchMove={stopTimer}
              >
                <AiFillCaretUp />
              </button>
              {/* frame value */}
              <div>
                <FrameFader value={frame[1]} setValue={setValue} />
              </div>
              <div className="frame-value">
                {isEditMode ? (
                  <form>
                    <input
                      onBlur={(e) => {
                        e.preventDefault();
                        setValue(e.target.value);
                        setIsEditMode(false);
                      }}
                      type="number"
                      value={temporeryValue}
                      onChange={(e) => {
                        setTemporeryValue(e.target.value);
                      }}
                      max={max}
                      min={min}
                    />
                  </form>
                ) : (
                  <span onDoubleClick={() => setIsEditMode(true)}>
                    {frame[1]}
                  </span>
                )}
              </div>

              <button
                className="btn down-btn"
                onClick={() => decreesValue(0.01)}
                onMouseDown={() => {
                  setTimer(
                    setInterval(() => {
                      decreesValue(0.5);
                    }, 150)
                  );
                }}
                onTouchStart={() => {
                  setTimer(
                    setInterval(() => {
                      decreesValue(0.5);
                    }, 150)
                  );
                }}
                onMouseUp={stopTimer}
                onMouseLeave={stopTimer}
                onTouchEnd={stopTimer}
                onTouchMove={stopTimer}
              >
                <AiFillCaretDown />
              </button>
            </>
          )}
        </>
      )}
      {/* visual representation of frame animation */}
      <div
        className="frame-inner-up"
        style={{
          height: `${getFrameHeight(frame) * (max / 2)}%`,
          background: isAnchor
            ? 'rgba(93, 255, 247, 0.5)'
            : 'rgb(168, 19, 19, 0.5)',
        }}
        onClick={() => {}}
      />
      <div
        className="frame-inner-down"
        style={{
          height: `${-getFrameHeight(frame) * (max / 2)}%`,
          background: isAnchor
            ? 'rgba(93, 255, 247, 0.5)'
            : 'rgb(168, 19, 19, 0.5)',
        }}
        onClick={() => {}}
      />
    </div>
  );
};

export default Frame;
