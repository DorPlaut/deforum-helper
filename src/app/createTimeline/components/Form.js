'use client';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const Form = () => {
  // local state
  const [fps, setFps] = useState(0);
  const [frameCount, setFrameCount] = useState(0);

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fps, frameCount);
    // request body
    const requestBody = {
      fps,
      frameCount,
    };
    // POST data to create timeline
    try {
      const response = await fetch('/api/timeline/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (data) {
        redirect('./editor');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="fps">Frame rate(fps):</label>
      <input
        type="number"
        value={fps}
        onChange={(e) => setFps(e.target.value)}
      />
      <label htmlFor="leangh">Video leangth (in frames)</label>
      <input
        type="number"
        value={frameCount}
        onChange={(e) => setFrameCount(e.target.value)}
      />
      <button type="submit">Create The Timeline</button>
    </form>
  );
};

export default Form;
