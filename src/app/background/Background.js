'use client';

import { angleToRadians } from '@/utils/angleToRadians';
import { Html, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Image from 'next/image';
import React, { useRef } from 'react';
import ImageBox from './ImageBox';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';

const Background = () => {
  return (
    <div className="background">
      <Canvas>
        <ambientLight intensity={0.5} />
        <ImageBox scale={1.6} />
        {/* <OrbitControls makeDefault /> */}
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Background;
