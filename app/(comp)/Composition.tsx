"use client";

import styles from "./comp.module.scss";
import React, { useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

interface canvasProps {
  alpha?: boolean;
  antialias?: boolean;
  colorManagement?: boolean;
  gl?: any;
  gl2?: any;
  invalidateFrameloop?: boolean;
  orthographic?: boolean;
  pixelRatio?: number;
  shadowMap?: boolean;
  updateDefaultCamera?: boolean;
  vr?: boolean;
  camera?: any;
  onCreated?: any;
  onPointerMissed?: any;
  raycaster?: any;
  resize?: any;
  style?: any;
  children?: any;
  physicallyCorrectLights: boolean;
}

export const Composition = () => {
  const vWidth = 100;
  const vHeight = 100;
  return (
    <Canvas
      camera={{
        near: 0.1,
        far: 1000,
        zoom: 1,
        position: [0, 0, 5],
      }}
      dpr={[1, 1]}
      gl={{
        alpha: true,
        stencil: false,
        depth: true,
        antialias: false,
        physicallyCorrectLights: true,
      }}
      // frameloop={"demand"}
      className={styles.Composition}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <fog attach="fog" args={[40, 10, 45]} />
      {/* <Lights /> */}
      {/* </Suspense> */}
      {/* <Physics
        allowSleep={false}
        size={100}
        // gravity={[clip.leftright, -9.8, clip.frontback]}
      > */}
      {/* <Debug color="white" scale={1.1}> */}
      {/* <CD position={[0, 10, -20]} rotation={[Math.PI / -2.5, 0, 0]} /> */}
      {/* </Physics> */}
      <OrbitControls />
    </Canvas>
  );
};
