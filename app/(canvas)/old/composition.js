import React, {
  useState,
  Suspense,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useSnapshot } from "valtio";
// import { CD } from "./CD";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  softShadows,
  PerspectiveCamera,
  OrbitControls,
  Select,
  // ContactShadows,
} from "@react-three/drei";
// import { ShaderMaterial } from 'three'
import { target, useSearch } from "../common/utils";
import { Lights, Spinner } from "./utils";
import { CD } from "./CD";
import { Node } from "./nodes";
import { Router, useLocation } from "wouter";
import { PhysicsFloor } from "./reflector";
import { Physics, usePlane } from "@react-three/cannon";
import { state, state } from "../common/state";

// Canvas
softShadows();

function Bounds() {
  function Bound(props) {
    const [ref] = usePlane(() => ({ ...props }));
    return (
      <mesh ref={ref}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    );
  }

  return (
    <>
      <Bound rotation={[Math.PI, 0, 0]} position={[0, 0, 7]} />
      <Bound rotation={[Math.PI, Math.PI, 0]} position={[0, 0, -7]} />
      <Bound rotation={[Math.PI, -Math.PI / 2, 0]} position={[4, 0, 0]} />
      <Bound rotation={[Math.PI, Math.PI / 2, 0]} position={[-4, 0, 0]} />
    </>
  );
}


const makeNodes = ({ hits, select, confirm, location }) => {
  return <>
    {location === "/" ?
      hits.map((hit, index) => (
        <Node hit={hit} key={index} index={index}
          select={select} confirm={confirm} />
      )) :
      <CD rotation={[-Math.PI / 2, Math.PI / 3.25, Math.PI / 2]} />}
  </>
}


// Composition
function Composition({ select, confirm, vWidth, vHeight }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(state);
  const [selected, setSelected] = useState([]);
  const camera = useRef(null);
  const [location] = useLocation();

  useEffect(() => {
    state.CanvasLoading = false;

    return () => {
      state.CanvasLoading = true;
    };
  }, []);

  const hits = useSearch(clip);
  const Nodes = useMemo(() => makeNodes({ hits, select, confirm, location }), [confirm, hits, location, select]);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        alpha: true,
        stencil: false,
        depth: true,
        antialias: false,
        physicallyCorrectLight: true,
      }}
      className="r3fCanvas"
      frameloop={"demand"}
    >
      {/* CAMERA */}
      <Suspense fallback={<Spinner />}>
        <PerspectiveCamera
          makeDefault
          ref={camera}
          target={clip.mobile ? target : [0, 2, 0]}
          zoom={1}
          position={
            clip.mobile ? clip.mobileCameraPosition : snap.cameraPosition
          }
          far={80}
          near={0.1}
          fov={clip.mobile ? 35 : 20}
          aspect={vWidth / vHeight}
        />
        {/* FOG */}
        <fog
          attach="fog"
          args={[
            snap.theme === "light" ? snap.light.fog : snap.dark.fog,
            10,
            clip.mobile ? (snap.theme === "light" ? 45 : 50) : 50,
          ]}
        />
        <Lights />
      </Suspense>
      <Physics
        allowSleep={false}
        size={100}
        gravity={[clip.leftright, -9.8, clip.frontback]}
      >
        {/* <Debug color="white" scale={1.1}> */}

        <PhysicsFloor />
        <Router path="/">
          <Suspense fallback={<Spinner />}>
            <Select onChange={setSelected}>
              {Nodes}
            </Select>
            <Bounds />
            {/* <CD position={[0, 10, -20]} rotation={[Math.PI / -2.5, 0, 0]} /> */}
          </Suspense>
        </Router>
        {/* </Debug> */}
      </Physics>
      <OrbitControls
        target={clip.mobile ? clip.target : [0, 2, 0]}
        onEnd={(e) => {
          if (clip.mobile) {
            // if (!selected[0]) { state.target = camera.target; }
            state.frontback = 0;
            state.leftright = 0;
          }
        }}
        touches={{
          ONE: selected[0] ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        }}
        enablePan={clip.mobile}
        enableDamping
        dampingFactor={1.8}
        minPolarAngle={clip.mobile ? -3 : Math.PI / 3}
        maxPolarAngle={clip.mobile ? Math.PI / 2 : Math.PI / 2}
        // autoRotate={clip.CanvasLoading}
        // autoRotateSpeed={clip.loading ? -50 : 0}
        minDistance={20}
        maxDistance={clip.mobile ? 40 : 36}
        enabled={clip.mobile ? !clip.drag : true}
      />
    </Canvas >
  );
}

export default Composition;

// < Debug color = { "light"} scale = { 1.03} >

