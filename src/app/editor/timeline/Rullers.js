import { useFramesStore } from '@/store/framesStore';
import framesToTime from '@/utils/framesToTime';
import React, { useState } from 'react';

const Rullers = ({ frames, zoom }) => {
  const { fps, frameCount, hoverdFrame, setHoverdFrame, transX } =
    useFramesStore((state) => state);
  //   local state
  const [isHovered, setIsHovered] = useState(false);
  // const [hoverdFrame, setHoverdFrame] = useState([0, 0, true]);

  return (
    <div className="rullers">
      <div className="timeline-ruller">
        {frames.map((frame, index) => {
          if (index < frameCount)
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
    </div>
  );
};

export default Rullers;
