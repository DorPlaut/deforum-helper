'use client';
import React from 'react';
import Scene from './Scene';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';

const page = () => {
  return (
    <div className="scene-container">
      <Canvas>
        <Scene />
      </Canvas>
      <Link className="linkk" href={'/editor'}>
        back to editor
      </Link>
    </div>
  );
};

export default page;
