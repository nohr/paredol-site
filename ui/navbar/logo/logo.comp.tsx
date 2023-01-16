"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import { Color, Euler, MeshBasicMaterial, SphereGeometry } from "three";
import { useSnapshot } from "valtio";
import { state } from "state";
import { usePathname } from "next/navigation";

function LogoCanvas({ style, text }: { [key: string]: any; text?: string }) {
  const { enableMotion } = useSnapshot(state);
  const path = usePathname();
  return (
    <Canvas
      style={style}
      className={`drag-none select-none ${
        // path === "/" ? (text ? "mx-auto flex" : "hidden") : "flex"
        "flex"
      }`}
      // gl={{ antialias: true }}
      // dpr={[1, 1.5]}
      // performance={{ min: 0.5 }}
      frameloop={enableMotion ? "demand" : "always"}
    >
      {text ? <CD text={text} /> : <CD />}
    </Canvas>
  );
}

export default memo(LogoCanvas);

export function CD({ text }: { text?: string }) {
  // const { gl } = useThree();
  // console.log(gl.info);
  const cd = useRef<any>();
  // const { hover } = props;
  const { loading, enableMotion, theme, speech } = useSnapshot(state);

  useFrame(({ mouse }) => {
    if (cd.current) {
      let { rotation } = cd.current;
      if (rotation) {
        handleenableMotion(enableMotion, loading, rotation, speech);
      }
      // if (text) {
      //   cd.current.lookAt(mouse);
      // }
    }
  });

  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        color: theme === "light" ? new Color(0x013566) : new Color(0x5d98d7),
      }),
    [theme]
  );
  const sphere = useMemo(() => new SphereGeometry(220, 40, 40), []);

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

function handleenableMotion(
  enableMotion: boolean,
  loading: boolean,
  // hover: boolean,
  rotation: Euler,
  speech: boolean
) {
  if (!enableMotion) {
    if (loading) {
      rotation.x = -Math.PI / 2;
      rotation.y += 0.05;
      rotation.z = 0;
    } else if (speech) {
      rotation.x = -Math.PI / 2;
      rotation.y = 0;
      rotation.z += 0.25;
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
