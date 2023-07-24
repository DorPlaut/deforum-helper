'use client';
import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useEffect, useState } from 'react';
import Frame from './Frame';
import Rullers from './Rullers';

const Timeline = ({
  selected,
  zoom,
  first,
  channelName,
  setSelectedChannel,
}) => {
  // data
  const {
    fps,
    frameCount,
    setTransX,
    setTransY,
    setTransZ,
    setRotX,
    setRotY,
    setRotZ,
  } = useFramesStore((state) => state);
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

  // update global state
  useEffect(() => {
    if (channelName === 'Translation X') setTransX(frames);
    if (channelName === 'Translation Y') setTransY(frames);
    if (channelName === 'Translation Z') setTransZ(frames);
    if (channelName === 'Rotation X') setRotX(frames);
    if (channelName === 'Rotation Y') setRotY(frames);
    if (channelName === 'Rotation Z') setRotZ(frames);
  }, [frames]);
  // update data on submit
  useEffect(() => {
    setFrames(createNumberArray());
  }, [frameCount, setFrames]);

  // ##
  // set inner div height to represent tranistions
  const getFrameHeight = (frame) => {
    const index = frame[0];
    const value = frame[1];
    const isAnchor = frame[2];
    if (isAnchor) {
      return value;
    } else {
      // calculate height of frame
      const nextAnchorFrame = findAnchor(index, 'next');
      const previousAnchorFrame = findAnchor(index, 'prev');
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
  const findAnchor = (index, direction) => {
    let newIndex;
    if (direction === 'next') newIndex = index + 1;
    if (direction === 'prev') newIndex = index - 1;
    if (newIndex < frames.length) {
      if (frames[newIndex].length === 3) {
        return frames[newIndex];
      } else {
        return findAnchor(newIndex, direction);
      }
    }
    return null;
  };
  // get middle frame value
  const interpolateValue = (previous, current, next) => {
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
  };
  // ##

  // COLORS
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  // get css var value
  useEffect(() => {
    if (document) {
      setColor1(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--editorColor4'
        )
      );
      setColor2(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--editorColor5'
        )
      );
    }
  }, []);

  return (
    <>
      {first && <Rullers zoom={zoom} frames={frames} />}

      <div
        onClick={() => setSelectedChannel(channelName)}
        className="timeline"
        style={{
          height: selected ? '8rem' : '2rem',
          background: selected ? color1 : color2,
        }}
      >
        {frames.map((frame, index) => {
          const isAnchor = frame.length === 3;
          return (
            <Frame
              key={index}
              index={index}
              frame={frame}
              frames={frames}
              setFrames={setFrames}
              zoom={zoom}
              isAnchor={isAnchor}
              selected={selected}
              getFrameHeight={getFrameHeight}
            />
          );
        })}
      </div>
    </>
  );
};

export default Timeline;
