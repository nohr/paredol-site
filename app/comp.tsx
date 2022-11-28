"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";

export const Composition = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxBufferGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
};
