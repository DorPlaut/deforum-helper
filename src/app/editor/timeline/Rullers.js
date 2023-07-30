import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useState } from 'react';

const Rullers = ({ frames, zoom }) => {
  const { fps, frameCount } = useFramesStore((state) => state);
  //   local state
  const [isHovered, setIsHovered] = useState(false);
  const [hoverdFrame, setHoverdFrame] = useState(0);

  return (
    <div className="rullers">
      <div className="timeline-ruller">
        {frames.map((frame, index) => {
          return (
            <div
              onMouseEnter={() => {
                setIsHovered(true);
                setHoverdFrame(index);
              }}
              onMouseLeave={() => setIsHovered(false)}
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

      <div className="time-display">
        {frames.length >= hoverdFrame ? (
          <span> {framesToTime(fps, frames[hoverdFrame][0])}</span>
        ) : (
          <span> 00:00:000</span>
        )}
      </div>
    </div>
  );
};

export default Rullers;
