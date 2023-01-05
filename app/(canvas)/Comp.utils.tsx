"use client";

import { memo, Suspense, useLayoutEffect } from "react";
import {
  Html,
  useProgress,
  MeshReflectorMaterial,
  useTexture,
} from "@react-three/drei";
import { DoubleSide, RepeatWrapping } from "three";
import { state } from "state";
import { useSnapshot } from "valtio";

// Spinner
export const Spinner = () => {
  const { progress } = useProgress();

  // useEffect(() => {
  //     cloud.CanvasLoading = true;

  //     return () => {
  //         cloud.CanvasLoading = false;
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

// export const canvas =
//   state.theme === "light"
//     ? {
//         env: "/hdri/puresky.hdr",
//         cd: {
//           color: `hsla(14, 31%, 84%, 1)`,
//           roughness: 0.3,
//         },
//         fog: {
//           color: `#f5f5f5`,
//           far: 25,
//         },
//         surface: {
//           color: `hsla(209, 100%, 80%, 1)`,
//           roughness: 0,
//           mirror: 0.15,
//         },
//         spotlight: `#ebebeb`,
//         rectIntensity: 2,
//         spotIntensity: 0.6,
//         ambIntensity: 0.3,
//       }
//     : {
//         env: "/hdri/moonless.hdr",
//         cd: {
//           color: `hsla(0, 0%, 14%, 1)`,
//           roughness: 0.1389,
//         },
//         fog: {
//           color: `#000000`,
//           far: 20,
//         },
//         surface: {
//           color: `hsla(209, 31%, 40%, 1)`,
//           roughness: 30,
//           mirror: 0.28,
//         },
//         spotlight: `hsla(209, 31%, 70%, 1)`,
//         rectIntensity: 0.5,
//         spotIntensity: 0.5,
//         ambIntensity: 0.8,
//       };

export function canvas(theme: string) {
  return theme === "light"
    ? {
        env: "/hdri/puresky.hdr",
        cd: {
          color: `hsla(14, 31%, 84%, 1)`,
          roughness: 0.3,
        },
        fog: {
          color: `#f5f5f5`,
          far: 25,
        },
        surface: {
          color: `hsla(209, 100%, 80%, 1)`,
          roughness: 0,
          mirror: 0.15,
        },
        spotlight: `#ebebeb`,
        rectIntensity: 2,
        spotIntensity: 0.6,
        ambIntensity: 0.3,
      }
    : {
        env: "/hdri/moonless.hdr",
        cd: {
          color: `hsla(0, 0%, 14%, 1)`,
          roughness: 0.1389,
        },
        fog: {
          color: `#474747`,
          far: 20,
        },
        surface: {
          color: `hsla(209, 31%, 40%, 1)`,
          roughness: 30,
          mirror: 0.28,
        },
        spotlight: `hsla(209, 31%, 70%, 1)`,
        rectIntensity: 0.5,
        spotIntensity: 0.5,
        ambIntensity: 0.8,
      };
}

// const ui =
//   state.theme === "light"
//     ? {
//         main: `#000000`,
//         secondary: `hsl(209, 100%, 20%)`,
//         hover: `hsla(209, 100%, 20%, 0.67)`,
//         active: `#5e5e5ed6`,
//         tertiary: `#C1C2C267`,
//         background: `#ebebeb`,
//       }
//     : {
//         main: `#ffffff`,
//         secondary: `hsl(209, 31%, 80%)`,
//         hover: `hsla(209, 31%, 80%, 0.67)`,
//         active: `#ebebeb97`,
//         tertiary: `#C1C2C267`,
//         background: `#000000`,
//     };
function ui(theme: string) {
  return theme === "light"
    ? {
        main: `#000000`,
        secondary: `hsl(209, 100%, 20%)`,
        hover: `hsla(209, 100%, 20%, 0.67)`,
        active: `#5e5e5ed6`,
        tertiary: `#C1C2C267`,
        background: `#ebebeb`,
      }
    : {
        main: `#ffffff`,
        secondary: `hsl(209, 31%, 80%)`,
        hover: `hsla(209, 31%, 80%, 0.67)`,
        active: `#ebebeb97`,
        tertiary: `#C1C2C267`,
        background: `#000000`,
      };
}
export function Lights() {
  const { theme } = useSnapshot(state);
  return (
    <>
      {/* SPOTLIGHT */}
      <spotLight
        intensity={canvas(theme).spotIntensity}
        decay={2}
        angle={Math.PI / 2}
        color={canvas(theme).spotlight}
        position={[90, 60, -50]}
      />
      {/* RECT LIGHT */}
      <rectAreaLight
        intensity={canvas(theme).rectIntensity}
        args={[canvas(theme).surface.color, 20, 70, 70]}
        position={[0, -1.1, 0]}
        rotation-x={Math.PI / 2}
      />
      {/* AMBIENT LIGHT */}
      <ambientLight intensity={canvas(theme).ambIntensity} />
    </>
  );
}

export function Fog() {
  const { theme } = useSnapshot(state);
  return (
    <fog
      attach="fog"
      args={[canvas(theme).fog.color, 10, canvas(theme).fog.far]}
    />
  );
}

// Scene walls for use with Effect Composer
export function Wall() {
  const { theme } = useSnapshot(state);
  return (
    <>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[30, 17, 0]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={ui(theme).secondary} opacity={0} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-30, 17, 0]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={ui(theme).secondary} opacity={0} />
      </mesh>
      <mesh rotation={[0, -Math.PI, 0]} position={[0, 17, 30]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={ui(theme).secondary} opacity={0} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 17, -30]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={ui(theme).secondary} opacity={0} />
      </mesh>
    </>
  );
}

const Reflector = memo(function Reflector() {
  const { theme } = useSnapshot(state);
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

  return (
    <MeshReflectorMaterial
      side={DoubleSide}
      resolution={1024}
      mirror={canvas(theme).surface.mirror}
      blur={[250, 250]}
      mixBlur={14}
      distortion={0}
      mixStrength={1}
      minDepthThreshold={0.9}
      maxDepthThreshold={1.1}
      depthScale={2}
      depthToBlurRatioBias={0.2}
      color={canvas(theme).surface.color}
      metalness={0}
      roughness={canvas(theme).surface.roughness}
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
      </mesh>
    </Suspense>
  );
}
