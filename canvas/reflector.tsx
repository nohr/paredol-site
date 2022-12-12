import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { memo, Suspense, useEffect, useLayoutEffect } from "react";
import { useTheme } from "styled-components";
import { DoubleSide, RepeatWrapping } from "three";
// import { useSnapshot } from "valtio";
// import { state } from "../common/state";
// import { Spinner } from "./utils";

const Reflector = memo(function Reflector() {
  const textures = useTexture([
    "/reflector/Ice_OCC.jpg",
    "/reflector/Ice_NORM.jpg",
    "/reflector/Ice_DISP.png",
    "/reflector/floor_rough.jpeg",
  ]);
  const [ao, normal, height, roughness] = textures;
  useLayoutEffect(() => {
    textures.forEach(
      (texture) => (
        (texture.wrapT = texture.wrapS = RepeatWrapping),
        texture.repeat.set(2, 2)
      )
    );
  }, [textures]);

  const theme = useTheme();
  return (
    <MeshReflectorMaterial
      side={DoubleSide}
      resolution={1024}
      mirror={theme.canvas.mirror}
      blur={[250, 250]}
      mixBlur={14}
      distortion={0}
      mixStrength={1}
      minDepthThreshold={0.9}
      maxDepthThreshold={1.1}
      depthScale={2}
      depthToBlurRatioBias={0.2}
      color={theme.canvas.surface}
      metalness={0}
      roughness={theme.canvas.rough}
      roughnessMap={roughness}
      aoMap={ao}
      normalMap={normal}
      envMapIntensity={1}
      bumpMap={height}
    />
  );
});

export function Floor() {
  return (
    // <Suspense fallback={<Spinner />}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[70, 70]} />
      {/* <Reflector /> */}
    </mesh>
    // </Suspense>
  );
}

export function PhysicsFloor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  })) as any;

  return (
    <Suspense fallback={null}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} ref={ref}>
        <planeGeometry args={[70, 70]} />
        <Reflector />
      </mesh>
    </Suspense>
  );
}
