import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, Ref, useEffect, useMemo, useRef } from "react";
import { useTheme } from "styled-components";
import {
  BufferGeometry,
  Euler,
  InstancedMesh,
  Material,
  MeshBasicMaterial,
  Object3D,
  SphereGeometry,
} from "three";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";

function LogoCanvas() {
  const { motion } = useSnapshot(state);
  return (
    <Canvas
      className="r3fCanvas"
      // gl={{ antialias: true }}
      // dpr={[1, 1.5]}
      // performance={{ min: 0.5 }}
      frameloop={motion ? "demand" : "always"}
    >
      <ambientLight intensity={0.1} />
      <CD />
    </Canvas>
  );
}

export default memo(LogoCanvas);

export function CD() {
  const { gl } = useThree();
  console.log(gl.info);
  const cd = useRef<any>();
  // const { hover } = props;
  const { loading, motion, theme } = useSnapshot(state);
  const { ui } = useTheme();

  useFrame(() => {
    if (cd.current) {
      let { rotation } = cd.current;
      if (rotation) {
        handleMotion(motion, loading, rotation);
      }
    }
  });

  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        color: `${theme === "light" ? "#013C66" : "#96B1C8"}`,
      }),
    [ui.secondary, theme]
  );
  const sphere = useMemo(() => new SphereGeometry(220, 15, 15), []);

  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      ref={cd}
      scale={0.0055}
      dispose={null}
    >
      <mesh position={[5.28, 0, -265.23]} geometry={sphere} material={mat} />
      <mesh position={[306.5, 0, 134.46]} geometry={sphere} material={mat} />
      <mesh position={[-296.7, 0, 134.46]} geometry={sphere} material={mat} />
    </group>
  );
}

function handleMotion(
  motion: boolean,
  loading: boolean,
  // hover: boolean,
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
