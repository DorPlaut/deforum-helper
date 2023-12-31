import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useState } from 'react';

const Rullers = ({ frames, zoom, RullerRef }) => {
  const {
    fps,
    frameCount,
    hoverdFrame,
    setHoverdFrame,
    transX,
    selectedFrame,
    setselectedFrame,
    markers,
    addMarker,
    removeMarker,
  } = useFramesStore((state) => state);
  //   local state
  const [isHovered, setIsHovered] = useState(false);
  // const [hoverdFrame, setHoverdFrame] = useState([0, 0, true]);
  return (
    <div className="rullers" ref={RullerRef}>
      <div className="timeline-ruller">
        {frames.map((frame, index) => {
          if (index < frameCount)
            return (
              <div
                onMouseEnter={() => {
                  setIsHovered(true);
                  setHoverdFrame(index);
                }}
                onClick={() => {
                  setselectedFrame(index);
                }}
                onDoubleClick={() => {
                  if (markers.includes(selectedFrame)) {
                    removeMarker(selectedFrame);
                  } else {
                    addMarker(selectedFrame);
                  }
                }}
                onMouseLeave={() => setIsHovered(false)}
                key={index}
                className="ruller-frame"
                style={{
                  width: `${zoom}px`,
                  background:
                    selectedFrame === frame[0]
                      ? '#5dfff999'
                      : markers.includes(frame[0]) && '#a8131380',
                }}
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
  );
};

export default Rullers;
