import React, { useState } from 'react';

const ZoomFader = ({ zoom, setZoom }) => {
  // local state
  const [isMosueDown, setIsMouseDown] = useState(false);
  //   handle drag
  const min = 1;
  const max = 100;
  const barWidth = 300;
  const handleFaderDrag = (event) => {
    if (isMosueDown && zoom <= max && zoom >= min) {
      const faderWidth = barWidth;
      const faderOffset = event.target.parentNode.getBoundingClientRect().left; // Get the offset of the fader-handle's parent (fader)
      const clickPosition = event.clientX - faderOffset;
      const percentage = clickPosition / faderWidth;
      const valueRange = max - min;
      const newValue = valueRange * percentage + min;
      setZoom(newValue);
    }
    if (zoom > max) setZoom(max);
    if (zoom < min) setZoom(min);
  };
  return (
    <div className="zoom-fader">
      <br />
      <div
        className="fader"
        style={{
          width: `${barWidth}px`,
          height: '10px',
          backgroundColor: '#ccc',
        }}
        onMouseMove={handleFaderDrag}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
      >
        <div
          className="fader-handle"
          style={{
            left: `${zoom - 2.5}%`,
          }}
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
        ></div>
      </div>
      <br />
      <div>{zoom}</div>
    </div>
  );
};

export default ZoomFader;
