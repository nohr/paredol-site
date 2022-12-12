"use client";

import styles from "./comp.module.scss";
import React, { memo, Suspense, useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Bowl } from "./Bowl";
import { Floor, PhysicsFloor } from "./reflector";
import { Physics } from "@react-three/cannon";
import { cloud } from "../common/state";
import { useSnapshot } from "valtio";
import { useWindowDimensions } from "../common/utils";
import { useTheme } from "styled-components";
import { Vector3 } from "three";

export function Lights() {
  const theme = useTheme();
  return (
    <>
      {/* SPOTLIGHT */}
      <spotLight
        intensity={theme.canvas.spotIntensity}
        decay={2}
        angle={Math.PI / 2}
        color={theme.canvas.spotlight}
        position={[90, 60, -50]}
      />
      {/* RECT LIGHT */}
      <rectAreaLight
        intensity={theme.canvas.rectIntensity}
        args={[theme.colors.secondary, 20, 20, 20]}
        position={[0, -1, 0]}
        rotation-x={-Math.PI / 2}
      />
      {/* AMBIENT LIGHT */}
      <ambientLight intensity={theme.canvas.ambIntensity} />
    </>
  );
}
export function Fog() {
  const theme = useTheme();
  return (
    <fog attach="fog" args={[theme.canvas.fog, 10, theme.canvas.fogFar]} />
  );
}

function Composition() {
  const clip = useSnapshot(cloud);
  let { width, height } = useWindowDimensions();

  return (
    <Canvas
      dpr={[1, 1]}
      // gl={{
      //   alpha: true,
      //   stencil: false,
      //   depth: true,
      //   antialias: false,
      //   physicallyCorrectLights: true,
      // }}
      frameloop="demand"
      className={styles.Composition}
    >
      <PerspectiveCamera
        makeDefault
        position={clip.mobile ? [0, 20, 25] : [0, 0, 0]}
        far={80}
        near={0.1}
        fov={clip.mobile ? 35 : 20}
        aspect={width / height}
      />
      <Fog />
      <Lights />
      <Suspense fallback={null}>
        <Bowl />
      </Suspense>
      <Floor />
      {/* <Physics>
        <PhysicsFloor />
      </Physics> */}
      <OrbitControls
        // touches={{
        //   ONE: selected[0] ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN,
        //   TWO: THREE.TOUCH.DOLLY_ROTATE,
        // }}
        // enablePan={clip.mobile}
        enableDamping
        dampingFactor={1.8}
        // minPolarAngle={Math.PI / 3}
        // maxPolarAngle={Math.PI / 2}
        // autoRotate={clip.CanvasLoading}
        // autoRotateSpeed={clip.UILoading ? -50 : 0}
        // minDistance={7}
        // maxDistance={15}
      />
    </Canvas>
  );
}

export default Composition;

// const Content = dynamic(
//   async () => {
//     const content = await import("./path-to-content");

//     return content.Content;
//   },
//   {
//     ssr: false,
//   }
// );
