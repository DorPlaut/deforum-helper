'use client';
import { useFramesStore } from '@/store/framesStore';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const Form = () => {
  // data
  const { fps, frameCount, setFps, setFrameCount } = useFramesStore(
    (state) => state
  );
  // local state
  const [tempFps, setTempFps] = useState(fps);
  const [tempFrameCount, setTempFrameCount] = useState(frameCount);

  //   handle submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(fps, frameCount);
  //   // request body
  //   const requestBody = {
  //     fps,
  //     frameCount,
  //   };
  //   // POST data to create timeline
  //   try {
  //     const response = await fetch('/api/timeline/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  //     const data = await response.json();
  //     if (data) {
  //       redirect('./editor');
  //     }
  //   } catch (error) {
  //     // Handle network or other errors
  //     console.error('An error occurred:', error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFps(tempFps);
    setFrameCount(tempFrameCount);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="fps">Frame rate(fps):</label>
      <input
        type="number"
        value={tempFps}
        onChange={(e) => setTempFps(parseInt(e.target.value))}
      />
      <label htmlFor="leangh">Video leangth (in frames)</label>
      <input
        type="number"
        value={tempFrameCount}
        onChange={(e) => setTempFrameCount(parseInt(e.target.value))}
      />
      <button className="btn" type="submit">
        Update Timeline Settings
      </button>
    </form>
  );
};

export default Form;
