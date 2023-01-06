import React, { useRef } from "react";
import { Group, MeshPhysicalMaterial } from "three";
import { useFrame } from "@react-three/fiber";

import { useSnapshot } from "valtio";
import { canvas } from "./Comp.utils";
import { state } from "state";

export function CD({ ...props }) {
  const cd = useRef<Group>(null!);
  const { loading, motion, theme } = useSnapshot(state);

  function Ball({ ...props }) {
    const material = new MeshPhysicalMaterial({
      // wireframe: true,
      color: canvas(theme).cd.color,
      reflectivity: 1,
      roughness: canvas(theme).cd.roughness,
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

  useFrame(() => {
    if (cd.current) {
      let { rotation } = cd.current;
      if (loading && !motion) {
        rotation["x"] += 0.005;
        rotation["y"] += 0.005;
        rotation["z"] += 0.005;
        // console.log(rotation);
      }
    }
  });

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
