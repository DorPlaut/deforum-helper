'use client';
import React, { useEffect, useRef } from 'react';
import Scene from './Scene';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';
import AudioPlayer from './AudioPlayer';

const page = () => {
  const audioRef = useRef();
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  });
  return (
    <div className="scene-container animation-fade-in">
      <Canvas>
        <Scene audioRef={audioRef} />
      </Canvas>
      <Link className="back-to-editor-btn  block-btn btn" href={'/editor'}>
        back to editor
      </Link>
      <AudioPlayer audioRef={audioRef} />
    </div>
  );
};

export default page;
