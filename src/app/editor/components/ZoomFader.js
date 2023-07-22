// import { Slider } from '@mui/material';
import React, { useState } from 'react';
import ReactSlider from 'react-slider';

const ZoomFader = ({ zoom, setZoom }) => {
  //   handle drag
  const min = 1;
  const max = 100;

  return (
    <div className="zoom-fader-container">
      <ReactSlider
        aria-label="zoom"
        className="zoom-fader"
        thumbClassName="btn zoom-fader-handle"
        onChange={(v) => setZoom(v)}
        value={zoom}
        min={min}
        max={max}
        renderThumb={(props, state) => {
          const { key, ...otherProps } = props;
          return <div key={key} {...otherProps}></div>;
        }}
      />
    </div>
  );
};

export default ZoomFader;
