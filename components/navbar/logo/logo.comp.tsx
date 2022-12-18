import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useTheme } from "styled-components";
import { MeshBasicMaterial } from "three";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";

export function LogoCanvas() {
  return (
    <Canvas
      className="r3fCanvas"
      gl={{ antialias: true, physicallyCorrectLights: false }}
      dpr={[1, 2]}
    >
      <orthographicCamera zoom={1} />
      <ambientLight intensity={1} />
      <CD rotation={[-Math.PI / 2, 0, 0]} />
    </Canvas>
  );
}

export function CD({ ...props }) {
  const cd = useRef<any>();

  function Ball({ ...props }) {
    const { ui } = useTheme();
    const material = new MeshBasicMaterial({
      color: ui.secondary,
    });

    return (
      <mesh {...props} material={material}>
        <sphereGeometry args={[220, 50, 50]} />
      </mesh>
    );
  }

  const { loading, motion } = useSnapshot(state);

  //   const { motion } = useSnapshot(state);
  // TODO: stop if motion disabled
  useFrame(() => {
    if (cd.current) {
      let { rotation } = cd.current;
      if (rotation) {
        if (!motion) {
          if (loading) {
            rotation.x = -Math.PI / 2;
            rotation.y += 0.05;
            rotation.z = 0;
          } else {
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
    }
  });

  return (
    <group {...props} ref={cd} scale={0.0057} dispose={null}>
      <Ball position={[5.28, 0, -265.23]} />
      <Ball position={[306.5, 0, 134.46]} />
      <Ball position={[-296.7, 0, 134.46]} />
    </group>
  );
}
