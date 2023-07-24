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
  return (
    <div
      className="frame"
      style={{ width: `${zoom}px`, border: zoom < 5 && 'none' }}
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
                onClick={() => {
                  // update frame value
                  const newFrames = [...frames];
                  if (frame[1] + 0.5 <= 10) {
                    newFrames[index][1] = frame[1] + 0.5;
                    if (newFrames[index].length === 2) {
                      newFrames[index].push(true);
                    }
                    setFrames(newFrames);
                    getFrameHeight(frame);
                  }
                }}
              >
                <AiFillCaretUp />
              </button>
              <span className="frame-value">{frame[1]}</span>
              <button
                className="btn down-btn"
                onClick={() => {
                  // update frame value
                  const newFrames = [...frames];
                  if (frame[1] - 0.5 >= 0) {
                    newFrames[index][1] = frame[1] - 0.5;
                    if (newFrames[index].length === 2) {
                      newFrames[index].push(true);
                    }
                    setFrames(newFrames);
                  }
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
        className="frame-inner"
        style={{
          height: `${getFrameHeight(frame) * 10}%`,
          background: isAnchor
            ? 'rgba(93, 255, 247, 0.5)'
            : 'rgb(168, 19, 19, 0.5)',
        }}
        onClick={() => {}}
      ></div>
    </div>
  );
};

export default Frame;
