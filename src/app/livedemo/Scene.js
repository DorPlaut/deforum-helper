import { useFramesStore } from '@/store/framesStore';
import framesToAnimation from '@/utils/framesToAnimation';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import useTimeline from '../../../hooks/useTimeline';
import * as THREE from 'three';

const Scene = () => {
  // data
  const { fps, frameCount, transX, transY, transZ, rotX, rotY, rotZ } =
    useFramesStore((state) => state);
  // camera settings
  const cameraRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
  // round camera position
  const roundToNearest = (num, multiple) =>
    Math.round(num / multiple) * multiple;

  // animation settings
  const animationSettings = framesToAnimation(
    fps,
    frameCount,
    transX,
    transY,
    transZ,
    rotX,
    rotY,
    rotZ
  );

  // BOXES
  // create boxes
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
          // position handle
          // Round the camera position to the nearest boxSpacing
          const roundedCameraX = roundToNearest(cameraPosition[0], boxSpacing);
          const roundedCameraY = roundToNearest(cameraPosition[1], boxSpacing);
          const roundedCameraZ = roundToNearest(cameraPosition[2], boxSpacing);
          // Create the mesh elements and push them into the temporary array
          newBoxes.push(
            <mesh
              position={[
                roundedCameraX + x * boxSpacing,
                roundedCameraY + y * boxSpacing,
                roundedCameraZ + z * boxSpacing,
              ]}
              key={x + '' + y + '' + z}
            >
              <boxGeometry args={[boxSize, boxSize, boxSize]} />
              <meshStandardMaterial color={'white'} />
            </mesh>
          );
        }
      }
    }
    setBoxes(newBoxes);
  };
  // rnder boxes
  useEffect(() => {
    populateBoxes();
  }, []);
  // END OF BOXES

  // ANIMATION
  // animation timeline
  const [timeLine, setTimeLine] = useState(-0.5);
  const [isRunning, setIsRunning] = useState(true);
  useTimeline(isRunning, setTimeLine);
  // camera animation values
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  // camera animation settings
  useFrame((state, delta) => {
    if (cameraRef.current && isRunning) {
      setCameraPosition([
        cameraRef.current.position.x,
        cameraRef.current.position.y,
        cameraRef.current.position.z,
      ]);
      populateBoxes();
      // console.log(cameraPosition);
      cameraRef.current.position.x -= positionX / 25;
      cameraRef.current.position.y += positionY / 25;
      cameraRef.current.position.z -= positionZ / 25;
      cameraRef.current.rotation.x += rotationX / 200;
      cameraRef.current.rotation.y -= rotationY / 200;
      cameraRef.current.rotation.z -= rotationZ / 200;
    }
  });

  // animate
  useEffect(() => {
    // set the animated values as their timestamp match the timeline
    // start
    if (isRunning) {
      animationSettings.translationX.map((timeStemp, index) => {
        if (timeLine === timeStemp[0]) setPositionX(timeStemp[1]);
      });
      animationSettings.translationY.map((timeStemp, index) => {
        if (timeLine === timeStemp[0]) setPositionY(timeStemp[1]);
      });
      animationSettings.translationZ.map((timeStemp, index) => {
        if (timeLine === timeStemp[0]) setPositionZ(timeStemp[1]);
      });
      animationSettings.rotationX.map((timeStemp, index) => {
        if (timeLine === timeStemp[0]) setRotationX(timeStemp[1]);
      });
      animationSettings.rotationY.map((timeStemp, index) => {
        if (timeLine === timeStemp[0]) setRotationY(timeStemp[1]);
      });
      animationSettings.rotationZ.map((timeStemp, index) => {
        if (timeLine === timeStemp[0]) setRotationZ(timeStemp[1]);
      });
      // end animation when reachd animation length
      if (timeLine > animationSettings.animationLength) setIsRunning(false);
    }
  }, [timeLine]);
  //

  //
  return (
    <>
      {/* cameras */}
      <mesh ref={cameraRef}>
        <PerspectiveCamera makeDefault />
      </mesh>
      {/* light */}
      <ambientLight intensity={2} />
      {/* fog */}
      <>
        <mesh position={cameraPosition} scale={10}>
          <boxGeometry args={[200, 200, 200]} />
          <meshBasicMaterial color={'black'} side={THREE.DoubleSide} />
        </mesh>
        <fog attach="fog" color={'black'} near={0} far={87} />
      </>
      {/* elements */}
      {...boxes}
    </>
  );
};

export default Scene;
