import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "../../common/state";
import { Floor, Fog, Lights, Spinner } from "./Comp.utils";
import { CD } from "./Models";
import { useTheme } from "styled-components";

const Camera = () => {
  //   const { width, height } = useThree((state) => state.size);
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 2, -10]}
        // far={30}
        near={0.1}
        fov={70}
        // aspect={width / height}
      ></PerspectiveCamera>
    </>
  );
};

const Controls = () => {
  return (
    <>
      <OrbitControls
        target={[0, 0, 0]}
        // touches={{
        //   ONE: TOUCH.ROTATE,
        //   TWO: TOUCH.DOLLY_ROTATE,
        // }}
        // enablePan={mobile}
        // enableDamping
        // dampingFactor={1.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        // autoRotate={true}
        // autoRotateSpeed={clip.UILoading ? -50 : 0}
        minDistance={7}
        maxDistance={15}
        enabled
      />
    </>
  );
};

export const Composition = () => {
  return (
    <Canvas
      // dpr={[1, 1.5]}
      className="h-full w-full"
      gl={{
        physicallyCorrectLights: false,
        preserveDrawingBuffer: true,
      }}
      frameloop={"demand"}
    >
      <Camera />
      <Lights />
      <Fog />
      <Suspense fallback={<Spinner />}>
        <CD />
      </Suspense>
      <Floor />
      <Controls />
    </Canvas>
  );
};
