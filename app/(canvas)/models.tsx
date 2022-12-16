import React, { useRef } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import { cloud, state } from "../../common/state";
import { useTheme } from "styled-components";
import { MeshPhysicalMaterial } from "three";

function Ball({ ...props }) {
  const theme = useTheme();
  const material = new MeshPhysicalMaterial({
    // wireframe: true,
    color: theme.canvas.cd,
    reflectivity: 1,
    roughness: theme.canvas.CDRough,
    metalness: 0.2,
    opacity: 1,
    clearcoat: 0.8,
  });

  return (
    <mesh {...props} castShadow receiveShadow material={material}>
      <sphereGeometry args={[220, 50, 50]} />
    </mesh>
  );
}

export function CD({ ...props }) {
  const cd = useRef<any>();
  const { mobile } = useSnapshot(cloud);
  //   const snap = useSnapshot(state);

  //   useFrame(() => {
  //     if (!mobile) {
  //       if (cd.current) {
  //         let { rotation } = cd.current;
  //         if (rotation) {
  //           console.log(rotation);
  //           //   rotation.x += 0.015;
  //           //   rotation.y += 0.0005;
  //           //   rotation.z += 0.015;
  //         }
  //       } else {
  //         return;
  //       }
  //     }
  //   });

  //   useFrame((state) => {
  //     cd.current && cd.current.lookAt(0, 0, -15);
  //     state.camera.position.lerp(new THREE.Vector3(0, 0, -15), 0.01);
  //   });

  return (
    <group
      ref={cd}
      scale={0.01}
      dispose={null}
      {...props}
      receiveShadow
      castShadow
    >
      <Ball position={[5.28, 0, -265.23]} />
      <Ball position={[306.5, 0, 134.46]} />
      <Ball position={[-296.7, 0, 134.46]} />
    </group>
  );
}
