'use client';
import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useEffect, useState } from 'react';
import Frame from './Frame';
import Rullers from './Rullers';
import Loading from '@/app/loading';

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
    transX,
    transY,
    transZ,
    rotX,
    rotY,
    rotZ,
  } = useFramesStore((state) => state);
  // select to correct channel
  const findFrames = () => {
    if (channelName === 'Translation X') return transX;
    if (channelName === 'Translation Y') return transY;
    if (channelName === 'Translation Z') return transZ;
    if (channelName === 'Rotation X') return rotX;
    if (channelName === 'Rotation Y') return rotY;
    if (channelName === 'Rotation Z') return rotZ;
  };
  const frames = findFrames();
  const findSetFrames = () => {
    if (channelName === 'Translation X') return setTransX;
    if (channelName === 'Translation Y') return setTransY;
    if (channelName === 'Translation Z') return setTransZ;
    if (channelName === 'Rotation X') return setRotX;
    if (channelName === 'Rotation Y') return setRotY;
    if (channelName === 'Rotation Z') return setRotZ;
  };
  const setFrames = findSetFrames();

  const handleFramesonPageLoad = () => {
    if (frames.length === 1) {
      setFrames(createNumberArray());
    }
  };

  const createNumberArray = () => {
    const numberArray = [];
    for (var i = 0; i <= frameCount; i++) {
      if (i === 0) numberArray.push([i, 0, true]);
      else numberArray.push([i, 0]);
    }
    return numberArray;
  };

  //
  useEffect(() => {
    while (frames.length < frameCount) {
      frames.push([frames.length, 0]);
    }
    while (frames.length > frameCount) {
      frames.pop();
    }
  }, [fps, frameCount, frames]);

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
  const [heightOpen, setHeightOpen] = useState('15rem');
  const [heightClose, setHeightClose] = useState('5rem');

  // get css variabls and set page on first load
  useEffect(() => {
    // set frames
    handleFramesonPageLoad();
    // css
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
      setHeightOpen(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--channelHeightOpen'
        )
      );
      setHeightClose(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--channelHeightClose'
        )
      );
    }
  }, []);

  return (
    <>
      {first && (
        <>
          <Rullers zoom={zoom} frames={frames} />
          {frames.length <= 1 && <Loading />}
        </>
      )}
      {frames.length > 1 && (
        <>
          <div
            onClick={() => setSelectedChannel(channelName)}
            className="timeline"
            style={{
              height: selected ? heightOpen : heightClose,
              background: selected ? color1 : color2,
            }}
          >
            {frames.map((frame, index) => {
              const isAnchor = frame.length === 3;
              if (frameCount > index)
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
      )}
    </>
  );
};

export default Timeline;
