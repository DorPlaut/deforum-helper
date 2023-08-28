import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useEffect, useRef, useState } from 'react';
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
  editroRef,
  channelName,
}) => {
  // global state
  const { fps, maxValue, far, near } = useFramesStore((state) => state);

  // set maximun and minimum possible values
  let max = maxValue;
  let min = -maxValue;
  let includesOnlyPositiveValues = false;
  if (channelName === 'fov_schedule') {
    max = 100;
    min = 1;
    includesOnlyPositiveValues = true;
  }
  if (channelName === 'strength_schedule') {
    max = 1;
    min = 0;
    includesOnlyPositiveValues = true;
  }
  if (channelName === 'near_schedule') {
    max = far;
    min = 0;
    includesOnlyPositiveValues = true;
  }
  if (channelName === 'far_schedule') {
    max = 10000;
    min = near;
    includesOnlyPositiveValues = true;
  }

  // turn a frame on and off
  const handleFrameActivation = () => {
    const newFrames = [...frames];
    if (newFrames[index].length === 2) {
      newFrames[index].push(true);
      newFrames[index][1] = includesOnlyPositiveValues ? min : 0;
    } else if (newFrames[index].length === 3) {
      newFrames[index].pop();
      newFrames[index][1] = includesOnlyPositiveValues ? min : 0;
    }
    setFrames(newFrames);
  };

  // HANDLE FRAME VALUE CHANGES
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
  // set value from argument
  const setValue = (value) => {
    // update frame value
    const newFrames = [...frames];
    if (value <= max && value >= min) {
      newFrames[index][1] = parseFloat(value);
      if (newFrames[index].length === 2) {
        newFrames[index].push(true);
      }
      setFrames(newFrames);
    }
  };

  // local states to handle value input functinality
  const [isEditMode, setIsEditMode] = useState(false);
  const [temporeryValue, setTemporeryValue] = useState(frame[1]);
  const stopTimer = () => {
    clearInterval(timer);
  };
  // timer for on mouse down / touch down
  const [timer, setTimer] = useState(null);

  // COLORS AND VISUAL SETTINGS
  // set local state for colors and heights
  const [green, setGreen] = useState('');
  const [red, setRed] = useState('');

  // Use Effect on page load
  useEffect(() => {
    // get css variabls and set local state
    if (document) {
      setGreen(
        getComputedStyle(document.documentElement).getPropertyValue('--green')
      );
      setRed(
        getComputedStyle(document.documentElement).getPropertyValue('--red')
      );
    }
  }, []);

  // // Handle frame height changes
  // const [frameHeight, setFrameHeight] = useState(0);
  // useEffect(() => {
  //   setFrameHeight(getFrameHeight(frame));
  // }, [frame]);

  // FRAME BUFFER - render the cntent of a frame only if the frame is on screen
  const frameRef = useRef();
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  //

  const checkVisibility = () => {
    const outerElement = editroRef.current;
    const innerElement = frameRef.current;

    if (outerElement && innerElement) {
      const outerRect = outerElement.getBoundingClientRect();
      const innerRect = innerElement.getBoundingClientRect();
      const outerX = outerRect.x;
      const outerWidth = outerRect.width;
      const innerX = innerRect.x;
      // if inner frame is on screen. return true
      if (innerX + 500 >= outerX && innerX - 500 <= outerWidth + outerX) {
        setIsInnerVisible(true);
      } else {
        setIsInnerVisible(false);
      }
    }
  };
  useEffect(() => {
    checkVisibility(); // Initial check
    const handleScroll = () => {
      checkVisibility();
    };

    const outerElement = editroRef.current;
    outerElement.addEventListener('scroll', handleScroll);
    return () => {
      outerElement.removeEventListener('scroll', handleScroll);
    };
  }, [zoom]);

  // JSX
  return (
    <div
      ref={frameRef}
      title={`frame:${frame[0]} time:${framesToTime(fps, frame[0])}`}
      className={'frame'}
      style={{
        width: `${zoom}px`,
        borderRight: zoom < 15 && 'none',
      }}
    >
      {isInnerVisible && (
        <div className="frame-inner animation-fade-in">
          {/*  */}
          {selected && zoom > 5 && (
            <>
              {/* on/off button */}
              {index > 0 && (
                <button
                  className="btn on-off-btn"
                  style={{
                    background: isAnchor ? green : red,

                    opacity: isAnchor && 1,
                  }}
                  onClick={handleFrameActivation}
                >
                  <AiOutlinePoweroff />
                </button>
              )}
              {/* Control frame value */}
              {isAnchor && (
                <>
                  {/* increes value button */}
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

                  {/* frame fader button value */}
                  <div>
                    <FrameFader
                      min={min}
                      max={max}
                      value={frame[1]}
                      setValue={setValue}
                    />
                  </div>
                  {/* show frame value */}
                  <div className="frame-value">
                    {isEditMode ? (
                      // edit frame value from a menual form
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setValue(temporeryValue);
                          setIsEditMode(false);
                        }}
                      >
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
                  {/* decrees value button */}
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
          {/* visual indicetion of frame animation */}
          <div
            className="frame-inner-up"
            style={{
              height:
                getFrameHeight(frame) > 0
                  ? includesOnlyPositiveValues
                    ? `${(getFrameHeight(frame) / max) * 100}%`
                    : `${(getFrameHeight(frame) / max) * 50}%`
                  : '0%',
              bottom: includesOnlyPositiveValues ? '0%' : '50%',
              background: isAnchor
                ? 'rgba(93, 255, 247, 0.5)'
                : 'rgb(168, 19, 19, 0.5)',
            }}
          />
          {includesOnlyPositiveValues || (
            <div
              className="frame-inner-down"
              style={{
                height:
                  getFrameHeight(frame) < 0
                    ? `${(getFrameHeight(frame) / min) * 50}%`
                    : '0%',
                background: isAnchor
                  ? 'rgba(93, 255, 247, 0.5)'
                  : 'rgb(168, 19, 19, 0.5)',
              }}
            />
          )}

          {/*  */}
        </div>
      )}
    </div>
  );
};

export default Frame;
