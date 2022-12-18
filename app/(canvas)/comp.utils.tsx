import { memo, Suspense, useLayoutEffect } from "react";
import { useTheme } from "styled-components";
import {
  Html,
  useProgress,
  MeshReflectorMaterial,
  useTexture,
  Environment,
} from "@react-three/drei";
import { DoubleSide, RepeatWrapping } from "three";

// Spinner
export const Spinner = () => {
  const { progress } = useProgress();

  // useEffect(() => {
  //     state.CanvasLoading = true;

  //     return () => {
  //         state.CanvasLoading = false;
  //     };
  // });

  return (
    <Html fullscreen>
      <div className="gugmu9vdpaw">
        <p>{`${Math.floor(progress)}`}</p>
      </div>
    </Html>
  );
};

export function Lights() {
  const { canvas, ui } = useTheme();
  return (
    <>
      {/* SPOTLIGHT */}
      <spotLight
        intensity={canvas.spotIntensity}
        decay={2}
        angle={Math.PI / 2}
        color={canvas.spotlight}
        position={[90, 60, -50]}
      />
      {/* RECT LIGHT */}
      <rectAreaLight
        intensity={canvas.rectIntensity}
        args={[canvas.surface.color, 20, 70, 70]}
        position={[0, -1.1, 0]}
        rotation-x={Math.PI / 2}
      />
      {/* AMBIENT LIGHT */}
      <ambientLight intensity={canvas.ambIntensity} />
    </>
  );
}

export function Fog() {
  const { canvas } = useTheme();
  return <fog attach="fog" args={[canvas.fog.color, 10, canvas.fog.far]} />;
}

// Scene walls for use with Effect Composer
// export function Wall() {
//   const { ui } = useTheme();
//   return (
//     <>
//       <mesh rotation={[0, -Math.PI / 2, 0]} position={[30, 17, 0]}>
//         <planeGeometry args={[70, 35]} />
//         <meshPhongMaterial color={ui.secondary} opacity={0} />
//       </mesh>
//       <mesh rotation={[0, Math.PI / 2, 0]} position={[-30, 17, 0]}>
//         <planeGeometry args={[70, 35]} />
//         <meshPhongMaterial color={ui.secondary} opacity={0} />
//       </mesh>
//       <mesh rotation={[0, -Math.PI, 0]} position={[0, 17, 30]}>
//         <planeGeometry args={[70, 35]} />
//         <meshPhongMaterial color={ui.secondary} opacity={0} />
//       </mesh>
//       <mesh rotation={[0, 0, 0]} position={[0, 17, -30]}>
//         <planeGeometry args={[70, 35]} />
//         <meshPhongMaterial color={ui.secondary} opacity={0} />
//       </mesh>
//     </>
//   );
// }

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

  const { canvas } = useTheme();
  return (
    <MeshReflectorMaterial
      side={DoubleSide}
      resolution={1024}
      mirror={canvas.surface.mirror}
      blur={[250, 250]}
      mixBlur={14}
      distortion={0}
      mixStrength={1}
      minDepthThreshold={0.9}
      maxDepthThreshold={1.1}
      depthScale={2}
      depthToBlurRatioBias={0.2}
      color={canvas.surface.color}
      metalness={0}
      roughness={canvas.surface.roughness}
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
    <Suspense fallback={<Spinner />}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[70, 70]} />
        <Reflector />
        {/* {!selected[0] ? (
          <Reflector />
        ) : (
          <meshBasicMaterial transparent opacity={0} />
        )} */}
      </mesh>
    </Suspense>
  );
}

export function Sky() {
  const { canvas } = useTheme();
  return (
    <Suspense fallback={null}>
      <Environment
        blur={100}
        files={canvas.env}
        ground={{ height: 1, radius: 70, scale: 20 }}
      />
    </Suspense>
  );
}
