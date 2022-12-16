import styled, { useTheme } from "styled-components";
import { Canvas } from "@react-three/fiber";
import { usePlane } from "@react-three/cannon";

export const Comp = styled(Canvas)`
  position: fixed !important;
  z-index: -100;
  height: 100vh;
  width: 100vw;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  overflow: hidden;
`;

// Spinner
// export const Spinner = () => {
//     const { progress } = useProgress();

//     useEffect(() => {
//         cloud.CanvasLoading = true;

//         return () => {
//             cloud.CanvasLoading = false;
//         };
//     });

//     return (
//         <Html fullscreen>
//             <div className="gugmu9vdpaw">
//                 <p>{`${Math.floor(progress)}`}</p>
//             </div>
//         </Html>
//     );
// };

export function Lights() {
  const theme = useTheme();
  return (
    <>
      {/* SPOTLIGHT */}
      <spotLight
        intensity={theme.canvas.spotIntensity}
        decay={2}
        angle={Math.PI / 2}
        color={theme.canvas.spotlight}
        position={[90, 60, -50]}
      />
      {/* RECT LIGHT */}
      <rectAreaLight
        intensity={theme.canvas.rectIntensity}
        args={[theme.colors.secondary, 20, 70, 70]}
        position={[0, -1, 0]}
        rotation-x={Math.PI / 2}
      />
      {/* AMBIENT LIGHT */}
      <ambientLight intensity={theme.canvas.ambIntensity} />
    </>
  );
}

export function Fog() {
  const theme = useTheme();
  return (
    <fog attach="fog" args={[theme.canvas.fog, 10, theme.canvas.fogFar]} />
  );
}

export function Wall() {
  const theme = useTheme();
  return (
    <>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[30, 17, 0]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={theme.colors.secondary} opacity={0} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-30, 17, 0]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={theme.colors.secondary} opacity={0} />
      </mesh>
      <mesh rotation={[0, -Math.PI, 0]} position={[0, 17, 30]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={theme.colors.secondary} opacity={0} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 17, -30]}>
        <planeGeometry args={[70, 35]} />
        <meshPhongMaterial color={theme.colors.secondary} opacity={0} />
      </mesh>
    </>
  );
}

export function Bounds() {
  function Bound({ ...props }) {
    const [ref] = usePlane(() => ({ ...props })) as any;
    return (
      <mesh ref={ref}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    );
  }

  return (
    <group rotation={[Math.PI / 4, 0, 0]}>
      <Bound rotation={[Math.PI, 0, 0]} position={[0, 0, 7]} />
      <Bound rotation={[Math.PI, Math.PI, 0]} position={[0, 0, -7]} />
      <Bound rotation={[Math.PI, -Math.PI / 2, 0]} position={[4, 0, 0]} />
      <Bound rotation={[Math.PI, Math.PI / 2, 0]} position={[-4, 0, 0]} />
    </group>
  );
}
