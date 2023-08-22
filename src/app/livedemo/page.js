'use client';
import React from 'react';
import Scene from './Scene';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';

const page = () => {
  return (
    <div className="scene-container animation-fade-in">
      <Canvas>
        <Scene />
      </Canvas>
      <Link className="back-to-editor-btn  block-btn btn" href={'/editor'}>
        back to editor
      </Link>
    </div>
  );
};

export default page;
