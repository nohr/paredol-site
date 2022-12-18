import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Ref, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import {
  BufferGeometry,
  Euler,
  InstancedMesh,
  Material,
  MeshBasicMaterial,
  Object3D,
} from "three";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";

export function LogoCanvas({ ...props }) {
  const { motion } = useSnapshot(state);
  return (
    <Canvas
      className="r3fCanvas"
      gl={{ antialias: true, physicallyCorrectLights: false }}
      // dpr={[1, 1.5]}
      frameloop={motion ? "demand" : "always"}
    >
      <orthographicCamera zoom={1} />
      <ambientLight intensity={1} />
      <CD {...props} rotation={[-Math.PI / 2, 0, 0]} />
    </Canvas>
  );
}

export function CD({ ...props }) {
  const { gl } = useThree();
  console.log(gl.info);

  function Ball({ ...props }) {
    const { ui } = useTheme();
    // const { hover } = props;

    return (
      <mesh {...props}>
        <sphereGeometry args={[220, 15, 15]} />
        <meshBasicMaterial color={ui.secondary} />
      </mesh>
    );
  }

  const cd = useRef<any>();
  const { hover } = props;
  const { loading, motion } = useSnapshot(state);

  //   const { motion } = useSnapshot(state);
  // TODO: stop if motion disabled
  useFrame(() => {
    if (cd.current) {
      let { rotation } = cd.current;
      if (rotation) {
        handleMotion(motion, loading, hover, rotation);
      }
    }
  });

  return (
    <group {...props} ref={cd} scale={0.0055} dispose={null}>
      <Ball {...props} position={[5.28, 0, -265.23]} />
      <Ball {...props} position={[306.5, 0, 134.46]} />
      <Ball {...props} position={[-296.7, 0, 134.46]} />
    </group>
  );
}

function handleMotion(
  motion: boolean,
  loading: boolean,
  hover: boolean,
  rotation: Euler
) {
  if (!motion) {
    if (loading) {
      rotation.x = -Math.PI / 2;
      rotation.y += 0.05;
      rotation.z = 0;
    }
    // else if (hover) {
    //   rotation.x = -Math.PI / 2;
    //   rotation.y = 0;
    //   rotation.z += 0.05;
    // }
    else {
      rotation.x += 0.005;
      rotation.y += 0.005;
      rotation.z += 0.005;
    }
  } else {
    rotation.x = -Math.PI / 2;
    rotation.y = 0;
    rotation.z = 0;
  }
}
