import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Select } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { cloud } from "../../common/state";
import { PhysicsFloor } from "./reflector";
import { Bounds, Fog, Lights } from "./comp.utils";
import { Debug, Physics } from "@react-three/cannon";
import { CD } from "./models";
import { useTheme } from "styled-components";
import { TOUCH } from "three";
import { Node } from "./nodes";
import { useSearch } from "../../common/utils";
import { cloudSearch } from "../components/panels/navigator/search/search.state";
import { cloudComp } from "./comp.state";

const Camera = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 2, -10]}
        // far={30}
        // near={0.1}
        fov={110}
        // aspect={width / height}
      ></PerspectiveCamera>
    </>
  );
};

const makeNodes = ({ hits }: { hits: any }) => {
  return (
    <>
      {hits?.map((hit: any, index: React.Key | null | undefined) => (
        <Node hit={hit} key={index} index={index} />
      ))}
    </>
  );
};

export const Composition = () => {
  const { mobile, projects } = useSnapshot(cloud);
  const { query } = useSnapshot(cloudSearch);
  const { target } = useSnapshot(cloudComp);
  const [selected, setSelected] = useState<any>([]);
  const hits = useSearch(projects, query);
  const Nodes = useMemo(() => makeNodes({ hits }), [hits]);

  return (
    <Canvas
      // dpr={[1, 1.5]}
      className="r3fCanvas"
      gl={{
        physicallyCorrectLights: false,
        // preserveDrawingBuffer: true,
      }}
      frameloop={"demand"}
    >
      <Camera />
      <Lights />
      <Fog />
      <Physics
        allowSleep={false}
        size={100}
        // gravity={[clip.leftright, -9.8, clip.frontback]}
      >
        <Debug color="white" scale={1.1}>
          <Suspense fallback={null}>
            <Select onChange={setSelected}>
              <Bounds />
              {Nodes}
            </Select>
          </Suspense>
          <PhysicsFloor />
        </Debug>
      </Physics>
      {/* <Environment
        blur={100}
        files={canvas.env}
        ground={{ height: 5, radius: 40, scale: 20 }}
      /> */}
      <OrbitControls
        target={target}
        touches={{
          ONE: selected[0] ? TOUCH.ROTATE : TOUCH.PAN,
          TWO: TOUCH.DOLLY_ROTATE,
        }}
        enablePan={mobile}
        enableDamping
        dampingFactor={1.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        // autoRotate={true}
        // autoRotateSpeed={clip.UILoading ? -50 : 0}
        minDistance={7}
        maxDistance={15}
        enabled
      />
    </Canvas>
  );
};
