'use client';
import React, { useState } from 'react';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlinePoweroff,
} from 'react-icons/ai';

const Timeline = ({ data, selected, zoom, first }) => {
  // local state for data
  const [fps, setFps] = useState(data.fps);
  const [frameCount, setFrameCount] = useState(data.frameCount);
  // create array of frames
  const createNumberArray = () => {
    const numberArray = [];
    for (var i = 0; i <= frameCount; i++) {
      if (i === 0) numberArray.push([i, 0, true]);
      else numberArray.push([i, 0]);
    }
    return numberArray;
  };
  const [frames, setFrames] = useState(createNumberArray());
  //

  // frames to time (minutes and seconds)
  function framesToTime(fps, frameNumber) {
    const totalSeconds = Math.floor(frameNumber / fps);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((frameNumber % fps) * (1000 / fps));

    // Format the time values with leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
  // colors
  const color1 = getComputedStyle(document.documentElement).getPropertyValue(
    '--editorColor4'
  );
  const color2 = getComputedStyle(document.documentElement).getPropertyValue(
    '--editorColor5'
  );
  const green = getComputedStyle(document.documentElement).getPropertyValue(
    '--green'
  );
  const red = getComputedStyle(document.documentElement).getPropertyValue(
    '--red'
  );

  // set inner div height to represent tranistions
  const [height, setHeight] = useState(0);
  const getFrameHeight = (frame) => {
    const index = frame[0];
    const value = frame[1];
    const isAnchor = frame[2];
    if (isAnchor) {
      return value;
    } else {
      // calculate height of frame
      const nextAnchorFrame = findNextAnchor(index);
      const previousAnchorFrame = findPreviousAnchor(index);
      // console.log(previousAnchorFrame, frame, nextAnchorFrame);
      if (previousAnchorFrame && frame && nextAnchorFrame) {
        return interpolateValue(previousAnchorFrame, frame, nextAnchorFrame);
      } else if (previousAnchorFrame && frame && !nextAnchorFrame) {
        return previousAnchorFrame[0], previousAnchorFrame[1];
      } else {
        return 0;
      }
    }
  };

  // find next anchor frame
  const findNextAnchor = (index) => {
    const newIndex = index + 1;
    if (newIndex < frames.length) {
      if (frames[newIndex].length === 3) {
        return frames[newIndex];
      } else {
        return findNextAnchor(newIndex);
      }
    }
    return null;
  };

  // find last anchor frame
  const findPreviousAnchor = (index) => {
    const newIndex = index - 1;
    if (newIndex >= 0) {
      if (frames[newIndex].length === 3) {
        return frames[newIndex];
      } else {
        return findPreviousAnchor(newIndex);
      }
    }
    return null;
  };

  // get middle frame value
  function interpolateValue(previous, current, next) {
    const [prevFrame, prevValue] = previous;
    const [currentFrame, currentValue] = current;
    const [nextFrame, nextValue] = next;
    // Calculate the percentage distance between the previous and next frames
    const totalFrames = nextFrame - prevFrame;
    const framesPassed = currentFrame - prevFrame;
    const progress = framesPassed / totalFrames;
    // Interpolate the numeric value based on the progress
    const interpolatedValue = prevValue + (nextValue - prevValue) * progress;
    return interpolatedValue;
  }
  return (
    <>
      {first && (
        <div className="rullers">
          <div className="timeline-ruller">
            {frames.map((frame, index) => {
              return (
                <div
                  key={index}
                  className="ruller-time"
                  style={{ width: `${zoom}px` }}
                >
                  {zoom > 20 && index % 5 === 0 && (
                    <span className="ruller-time-number">
                      {framesToTime(fps, frame[0])}
                    </span>
                  )}
                  {zoom < 20 && index % 10 === 0 && (
                    <span className="ruller-time-number">
                      {framesToTime(fps, frame[0])}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="timeline-ruller">
            {frames.map((frame, index) => {
              return (
                <div
                  key={index}
                  className="ruller-frame"
                  style={{ width: `${zoom}px` }}
                >
                  {zoom > 20 && index % 5 === 0 && (
                    <span className="ruller-frame-number">{frame[0]}</span>
                  )}
                  {zoom < 20 && index % 10 === 0 && (
                    <span className="ruller-frame-number">{frame[0]}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        className="timeline"
        style={{
          height: selected ? '8rem' : '2rem',
          background: selected ? color1 : color2,
          // marginTop: first ? '1rem' : '0',
        }}
      >
        {frames.map((frame, index) => {
          const isAnchor = frame.length === 3;
          return (
            <div
              // onClick={() => {
              //   getFrameHeight(frame);
              // }}
              className="frame"
              key={index}
              style={{ width: `${zoom}px`, border: zoom < 5 && 'none' }}
            >
              {selected && (
                <>
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
                  {isAnchor && (
                    <>
                      <button
                        className="btn up-btn"
                        onClick={() => {
                          // update frame value
                          const newFrames = [...frames];
                          if (frame[1] + 1 <= 10) {
                            newFrames[index][1] = frame[1] + 1;
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
                          if (frame[1] - 1 >= 0) {
                            newFrames[index][1] = frame[1] - 1;
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
        })}
      </div>
    </>
  );
};

export default Timeline;
