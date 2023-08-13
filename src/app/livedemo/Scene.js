'use client';
import { useFramesStore } from '@/store/framesStore';
import framesToAnimation from '@/utils/framesToAnimation';
import {
  Center,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { use, useEffect, useRef, useState } from 'react';
import useTimeline from '../../../hooks/useTimeline';
import * as THREE from 'three';
import Timeline from '../editor/timeline/Timeline';
import LiveMenu from './LiveMenu';

const Scene = () => {
  // global state
  const { fps, frameCount, transX, transY, transZ, rotX, rotY, rotZ } =
    useFramesStore((state) => state);
  // camera settings
  const cameraRef = useRef();
  const { camera } = useThree();

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
  const [timeLine, setTimeLine] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  useTimeline(isRunning, setTimeLine);
  // camera animation values
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);

  // camera animation!
  useFrame((state, delta) => {
    // chack if camera exist
    if (cameraRef.current && isRunning) {
      // update boxes positon
      if (timeLine % 2 === 0) {
        setCameraPosition([
          cameraRef.current.position.x,
          cameraRef.current.position.y,
          cameraRef.current.position.z,
        ]);
        populateBoxes();
      }
      // control camera movment
      // POSITION
      // get ref position
      const direction = new THREE.Vector3();
      cameraRef.current.getWorldDirection(direction);
      const up = new THREE.Vector3(0, 1, 0);
      up.applyQuaternion(cameraRef.current.quaternion);
      const right = new THREE.Vector3();
      right.crossVectors(direction, up);
      // set animation speed
      const moveX = right.multiplyScalar(-(positionX / 50));
      const moveY = up.multiplyScalar(positionY / 50);
      const moveZ = direction.multiplyScalar(-(positionZ / 50));
      // add the values to the ref to animate
      cameraRef.current.position.add(moveX);
      cameraRef.current.position.add(moveY);
      cameraRef.current.position.add(moveZ);

      //  ROTATION

      const rotateX = rotationX / 250;
      const rotateY = rotationY / 250;
      const rotateZ = rotationZ / 250;

      cameraRef.current.rotateX(rotateX);
      cameraRef.current.rotateY(-rotateY);
      cameraRef.current.rotateZ(-rotateZ);

      //  set frame movment value from global state
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
      if (timeLine >= animationSettings.animationLength) setIsRunning(false);

      //
    }
  });

  // anchor box
  const [isAnchorOn, setIsAnchorOn] = useState(false);

  //
  return (
    <>
      {/* cameras */}
      <mesh ref={cameraRef}>
        <Center>
          <Html>
            <LiveMenu
              setIsAnchorOn={setIsAnchorOn}
              isAnchorOn={isAnchorOn}
              timeLine={timeLine}
              setTimeLine={setTimeLine}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              animationSettings={animationSettings}
            />
          </Html>
        </Center>
        <PerspectiveCamera makeDefault />
      </mesh>

      {/* light */}
      <ambientLight intensity={2} />
      {/* fog */}
      <>
        {/* anchor box */}
        {isAnchorOn && (
          <mesh position={[0, 0, -15]} scale={1.1}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={'red'} />
          </mesh>
        )}

        {/* background */}
        <mesh position={cameraPosition} scale={10}>
          <boxGeometry args={[200, 200, 200]} />
          <meshBasicMaterial color={'black'} side={THREE.DoubleSide} />
        </mesh>
        <fog attach="fog" color={'black'} near={0} far={87} />
        {/* <OrbitControls makeDefault /> */}
      </>
      {/* elements */}
      <mesh>{...boxes}</mesh>
    </>
  );
};

export default Scene;
