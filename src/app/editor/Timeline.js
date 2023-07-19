'use client';
import React, { useState } from 'react';

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

  // colors
  const color1 = getComputedStyle(document.documentElement).getPropertyValue(
    '--editorColor4'
  );
  const color2 = getComputedStyle(document.documentElement).getPropertyValue(
    '--editorColor5'
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
    if (newIndex > 0) {
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
        <div className="timeline-ruller">
          {frames.map((frame, index) => {
            return (
              <div
                key={index}
                className="ruller-frame"
                style={{ width: `${zoom}px` }}
              >
                {zoom > 20 && index % 5 === 0 && (
                  <span className="ruller-number">{frame[0]}</span>
                )}
                {zoom < 20 && index % 10 === 0 && (
                  <span className="ruller-number">{frame[0]}</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div
        // onClick={() => {
        //   console.log(frames);
        // }}
        className="timeline"
        style={{
          height: selected ? '8rem' : '2rem',
          background: selected ? color1 : color2,
          marginTop: first ? '1rem' : '0',
        }}
      >
        {frames.map((frame, index) => {
          const isAnchor = frame.length === 3;
          return (
            <div
              onClick={() => {
                getFrameHeight(frame);
              }}
              className="frame"
              key={index}
              style={{ width: `${zoom}px` }}
            >
              {selected && (
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
                    /\
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
                    \/
                  </button>
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
