"use client";

import styles from "./comp.module.scss";
import React, { memo, Suspense, useRef, useState } from "react";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box";
import { Bowl } from "./Bowl";
// function Box(props: ThreeElements["mesh"]) {
//   const ref = useRef<THREE.Mesh>(null!);
//   const [hovered, hover] = useState<boolean>(false);
//   const [clicked, click] = useState<boolean>(false);
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
//   return (
//     <mesh
//       {...props}
//       ref={ref}
//       scale={clicked ? 1.5 : 1}
//       onClick={() => click(!clicked)}
//       onPointerOver={() => hover(true)}
//       onPointerOut={() => hover(false)}
//     >
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

function Composition() {
  return (
    <Canvas
      orthographic
      camera={{
        zoom: 50,
        position: [0, 8, 0],
      }}
      dpr={[1, 1]}
      gl={{
        alpha: true,
        stencil: false,
        depth: true,
        antialias: false,
        physicallyCorrectLights: true,
      }}
      frameloop="always"
      className={styles.Composition}
    >
      <ambientLight />
      <pointLight position={[0, 4, -10]} intensity={6} />
      <Suspense fallback={null}>
        {/* <Box /> */}
        <Bowl />
      </Suspense>
      {/* <OrbitControls
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
        minDistance={7}
        maxDistance={15}
      /> */}
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
