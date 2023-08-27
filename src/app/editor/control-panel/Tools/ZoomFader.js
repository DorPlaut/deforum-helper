'use client';
// import { Slider } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import ReactSlider from 'react-slider';

const ZoomFader = ({ zoom, setZoom }) => {
  //   handle drag
  const min = 1;
  const max = 100;

  return (
    <div className="zoom-container">
      <span>
        <AiOutlineZoomOut /> / <AiOutlineZoomIn />
      </span>

      <div className="zoom-fader-container">
        <ReactSlider
          aria-label="zoom"
          className="zoom-fader"
          thumbClassName="btn zoom-fader-handle"
          onChange={(v) => {
            setZoom(v);
          }}
          onAfterChange={(v) => {
            setZoom(v);
            setTimeout(() => {
              console.log('lets update');
              setZoom(v);
            }, 1000);
          }}
          value={zoom}
          min={min}
          max={max}
          renderThumb={(props, state) => {
            const { key, ...otherProps } = props;
            return <div title="zoom view" key={key} {...otherProps}></div>;
          }}
        />
      </div>
    </div>
  );
};

export default ZoomFader;
