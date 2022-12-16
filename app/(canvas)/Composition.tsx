"use client";

import React from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Bowl } from "./Bowl";
import { Floor, PhysicsFloor } from "./reflector";
import { Physics } from "@react-three/cannon";
// import { useWindowDimensions } from "../common/utils";
import { Comp, Fog, Lights } from "./comp.utils";

function Composition() {
  return (
    <Comp
      orthographic
      camera={{ position: [0, 2, 10], fov: 50 }}
      dpr={[1, 1]}
      // gl={{
      //   alpha: true,
      //   stencil: false,
      //   depth: true,
      //   antialias: false,
      //   physicallyCorrectLights: true,
      // }}
      frameloop="demand"
    >
      {/* <PerspectiveCamera
        makeDefault
        position={clip.mobile ? [0, 20, 25] : [0, 0, 0]}
        far={80}
        near={0.1}
        fov={clip.mobile ? 35 : 20}
        // aspect={width / height}
      /> */}
      <Fog />
      <Lights />
      <Bowl />
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
    </Comp>
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
