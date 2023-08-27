import { angleToRadians } from '@/utils/angleToRadians';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ImageBox = (props) => {
  const boxRef = useRef();
  const imgRef = useRef();
  // animation
  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.002;
      boxRef.current.rotation.x += 0.001;
    }
  });

  // images animation
  const [isActive, setIsActive] = useState(false);
  // img scale
  const scale = 0.15;
  return (
    <mesh
      {...props}
      ref={boxRef}
      onPointerEnter={() => {
        setIsActive(true);
      }}
      onPointerLeave={() => {
        setIsActive(false);
      }}
    >
      {/* front */}
      <Html
        position={[0, 0, 1]}
        rotation={[0, 0, 0]}
        scale={scale}
        occlude="blending"
        transform
      >
        <Image
          className="box-image"
          src="/textures/boxside1.gif"
          alt=""
          draggable={false}
          height={512}
          width={512}
        />
      </Html>
      {/* back */}
      <Html
        position={[0, 0, -1]}
        rotation={[0, angleToRadians(180), 0]}
        scale={scale}
        occlude="blending"
        transform
      >
        <Image
          className="box-image"
          src="/textures/boxside1.gif"
          alt=""
          draggable={false}
          height={512}
          width={512}
        />
      </Html>
      {/* sides */}
      <Html
        position={[1, 0, 0]}
        rotation={[0, angleToRadians(90), 0]}
        scale={scale}
        occlude="blending"
        transform
      >
        <Image
          className="box-image"
          src="/textures/boxside2.gif"
          alt=""
          draggable={false}
          height={512}
          width={512}
        />
      </Html>
      {/* side */}
      <Html
        position={[-1, 0, 0]}
        rotation={[0, angleToRadians(-90), 0]}
        scale={scale}
        occlude="blending"
        transform
      >
        <Image
          className="box-image"
          src="/textures/boxside2.gif"
          alt=""
          draggable={false}
          height={512}
          width={512}
        />
      </Html>
      {/* up */}
      <Html
        position={[0, 1, 0]}
        rotation={[angleToRadians(90), 0, 0]}
        scale={scale}
        occlude="blending"
        transform
      >
        <Image
          className="box-image"
          src="/textures/boxside3.gif"
          alt=""
          draggable={false}
          height={512}
          width={512}
        />
      </Html>
      {/* down */}
      <Html
        position={[0, -1, 0]}
        rotation={[angleToRadians(-90), 0, 0]}
        scale={scale}
        occlude="blending"
        transform
      >
        <Image
          className="box-image"
          src="/textures/boxside3.gif"
          alt=""
          draggable={false}
          height={512}
          width={512}
        />
      </Html>

      <boxGeometry args={[1.98, 1.98, 1.98]} />
      <meshStandardMaterial color={[10, 10, 10]} />
    </mesh>
  );
};

export default ImageBox;
