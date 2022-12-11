import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { DefaultTheme, useTheme } from "styled-components";

type GLTFResult = GLTF & {
  nodes: {
    bowl1: THREE.Mesh;
  };
  materials: {};
};

export function Bowl(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/models/bowl.gltf") as unknown as GLTFResult;
  const theme: DefaultTheme = useTheme();

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bowl1.geometry}
        material={nodes.bowl1.material}
        userData={{ name: "bowl.1" }}
      >
        <meshStandardMaterial color={theme.colors.secondary} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/bowl.gltf");
