'use client';
import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useEffect, useState } from 'react';
import Frame from './Frame';
import Rullers from './Rullers';
import Loading from '@/app/loading';
import { useRef } from 'react';

const Timeline = ({
  selected,
  zoom,
  first,
  channelName,
  setSelectedChannel,
  editroRef,
}) => {
  // Global state
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
    maxValue,
  } = useFramesStore((state) => state);
  // SELECT TIMELINE CHANNEL
  // find current channel by channel name and set it to frames
  const findFrames = () => {
    if (channelName === 'Translation X') return transX;
    if (channelName === 'Translation Y') return transY;
    if (channelName === 'Translation Z') return transZ;
    if (channelName === 'Rotation X') return rotX;
    if (channelName === 'Rotation Y') return rotY;
    if (channelName === 'Rotation Z') return rotZ;
  };
  const frames = findFrames();

  // find the setState function for the channel and set set it to setFrames
  const findSetFrames = () => {
    if (channelName === 'Translation X') return setTransX;
    if (channelName === 'Translation Y') return setTransY;
    if (channelName === 'Translation Z') return setTransZ;
    if (channelName === 'Rotation X') return setRotX;
    if (channelName === 'Rotation Y') return setRotY;
    if (channelName === 'Rotation Z') return setRotZ;
  };
  const setFrames = findSetFrames();

  // HANDLE TIMELINE LENGTH
  // fill array to match frameCount
  const fillFrames = () => {
    while (frames.length < frameCount) {
      frames.push([frames.length, 0]);
    }
    while (frames.length > frameCount) {
      frames.pop();
    }
  };

  // make sure frames length match frameCount on settings update
  useEffect(() => {
    fillFrames();
  }, [fps, frameCount]);

  // HANDLE VISUAL VALUE INDICATORS
  // set inner div height to represent camera tranistions
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
  // find next active anchor frame
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

  // COLORS AND VISUAL SETTINGS
  // set local state for colors and heights
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [heightOpen, setHeightOpen] = useState('15rem');
  const [heightClose, setHeightClose] = useState('5rem');

  // Use Effect on page load
  useEffect(() => {
    // make sure frames length match frameCount
    fillFrames();
    // get css variabls and set local state
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
  // JSX

  // useEffect(() => {
  //   if (editroRef.current) {
  //     console.log(editroRef);
  //     console.log(editroRef.current.clientHeight);
  //     console.log(editroRef.current.offsetWidth);
  //     console.log(editroRef.current.offsetTop);
  //     console.log(editroRef.current.offsetHeight);
  //     console.log(editroRef.current.offsetLeft);
  //     console.log(editroRef.current.clientWidth);
  //   }
  // }, [frames]);
  return (
    <>
      {/* a timeline ruller. only render on top of the first channel */}
      {first && (
        <>
          <Rullers zoom={zoom} frames={frames} />
          {frames.length <= 1 && <Loading />}
        </>
      )}
      {/* a timeline channel contain frames  */}
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
                    editroRef={editroRef}
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
