import { useFramesStore } from '@/store/framesStore';
import framesToAnimation from '@/utils/framesToAnimation';
import { useSpring, animated, config } from '@react-spring/three';
import { Box, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useTimeline from '../../../hooks/useTimeline';

const Scene = () => {
  // data
  const { fps, frameCount, transX, transY, transZ, rotX, rotY, rotZ } =
    useFramesStore((state) => state);
  // camera animation
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
  const [cameraRotation, setCameraRotation] = useState([0, 0, 0]);
  const { animatedCameraPosition, animatedCameraRotation } = useSpring({
    animatedCameraPosition: cameraPosition,
    animatedCameraRotation: cameraRotation,
    config: config.slow,
  });
  // monitor position/rotation

  const [boxes, setBoxes] = useState([]);
  const boxSpacing = 15;
  const populateBoxes = () => {
    const boxesAmount = 10; // Adjust this value as needed.
    const halfBoxesAmount = Math.floor(boxesAmount / 2);
    const boxSize = 1;

    // Create a temporary array to hold the boxes
    const newBoxes = [];

    for (let x = -halfBoxesAmount; x <= halfBoxesAmount; x++) {
      for (let y = -halfBoxesAmount; y <= halfBoxesAmount; y++) {
        for (let z = -halfBoxesAmount; z <= halfBoxesAmount; z++) {
          // Create the mesh elements and push them into the temporary array
          newBoxes.push(
            <mesh
              position={[
                cameraPosition[0] + x * boxSpacing,
                cameraPosition[1] + y * boxSpacing,
                cameraPosition[2] + z * boxSpacing,
              ]}
              key={x + '' + y + '' + z}
            >
              <boxGeometry args={[boxSize, boxSize, boxSize]} />
              <meshStandardMaterial color={'black'} />
            </mesh>
          );
        }
      }
    }

    // Update the state with the new array of boxes
    setBoxes(newBoxes);
  };

  // timeline
  const [animationSettings, setAnimationSettings] = useState(
    framesToAnimation(fps, frameCount, transX, transY, transZ, rotX, rotY, rotZ)
  );
  useEffect(() => {
    populateBoxes();
    console.log(animationSettings);
  }, []);

  // TIMELINE ANIMATION
  const [timeLine, setTimeLine] = useState(-0.5);
  const [isRunning, setIsRunning] = useState(true);
  useTimeline(isRunning, setTimeLine);
  // ANIMATE!

  useEffect(() => {
    // monitor timeline
    // console.log(timeLine);
    // start
    // trans x
    animationSettings.translationX.map((timeStemp, index) => {
      if (timeLine === timeStemp[0])
        setCameraPosition([timeStemp[1], cameraPosition[1], cameraPosition[2]]);
    });
    animationSettings.translationY.map((timeStemp, index) => {
      if (timeLine === timeStemp[0])
        setCameraPosition([cameraPosition[0], timeStemp[1], cameraPosition[2]]);
    });
    animationSettings.translationZ.map((timeStemp, index) => {
      if (timeLine === timeStemp[0])
        setCameraPosition([cameraPosition[0], cameraPosition[1], timeStemp[1]]);
    });

    // end
    if (timeLine > animationSettings.animationLength) setIsRunning(false);
  }, [timeLine]);
  //
  return (
    <group>
      {/* cameras */}
      <animated.mesh
        position={animatedCameraPosition}
        rotation={animatedCameraRotation}
      >
        <PerspectiveCamera makeDefault />
      </animated.mesh>

      {/* lights */}
      {...boxes}
      {/* <OrbitControls makeDefault /> */}
    </group>
  );
};

export default Scene;
