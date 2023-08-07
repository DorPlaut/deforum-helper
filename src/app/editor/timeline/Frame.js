import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useEffect, useState } from 'react';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlinePoweroff,
} from 'react-icons/ai';

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
      newFrames[index][1] = frame[1] + increment;
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
      newFrames[index][1] = frame[1] - decrement;
      if (newFrames[index].length === 2) {
        newFrames[index].push(true);
      }
      setFrames(newFrames);
    }
  };
  const [timer, setTimer] = useState(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
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
                onMouseUp={() => {
                  clearInterval(timer);
                }}
                onMouseLeave={() => {
                  clearInterval(timer);
                }}
              >
                <AiFillCaretUp />
              </button>
              <span className="frame-value">{frame[1].toFixed(2)}</span>
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
                onMouseUp={() => {
                  clearInterval(timer);
                }}
                onMouseLeave={() => {
                  clearInterval(timer);
                }}
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
