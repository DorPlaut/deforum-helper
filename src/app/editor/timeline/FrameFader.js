'use client';
import React, { useState } from 'react';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import ReactSlider from 'react-slider';

const FrameFader = ({ value, setValue }) => {
  //   handle drag
  const min = -10;
  const max = 10;

  return (
    <div className="frame-fader-container">
      <div className="frame-fader-inner">
        <ReactSlider
          orientation="vertical"
          invert={true}
          step={0.1}
          aria-label="value"
          className="frame-fader"
          thumbClassName="btn frame-fader-handle"
          onChange={(v) => setValue(v)}
          value={value}
          min={min}
          max={max}
          renderThumb={(props, state) => {
            const { key, ...otherProps } = props;
            return <div key={key} {...otherProps}></div>;
          }}
        />
      </div>
    </div>
  );
};

export default FrameFader;
