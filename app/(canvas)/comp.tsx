import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Select } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { cloud } from "../../common/state";
import { Bounds, Floor, Fog, Lights, Sky } from "./comp.utils";
import { Debug, Physics } from "@react-three/cannon";
import { CD, Node } from "./models";
import { Mesh, TOUCH } from "three";
import { useSearch } from "../../common/utils";
import { cloudSearch } from "../components/panels/navigator/search/search.state";
import { cloudComp } from "./comp.state";

const Camera = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 2, -7]}
        // far={30}
        near={0.1}
        fov={90}
        // aspect={width / height}
      ></PerspectiveCamera>
    </>
  );
};

const Controls = ({ selected }: { selected: Array<Mesh> }) => {
  const { mobile } = useSnapshot(cloud);
  const { target } = useSnapshot(cloudComp);

  return (
    <>
      <OrbitControls
        target={target}
        touches={{
          ONE: selected[0] ? TOUCH.ROTATE : TOUCH.PAN,
          TWO: TOUCH.DOLLY_ROTATE,
        }}
        enablePan={mobile}
        // enableDamping
        // dampingFactor={1.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        // autoRotate={true}
        // autoRotateSpeed={clip.UILoading ? -50 : 0}
        minDistance={7}
        maxDistance={15}
        enabled
      />
    </>
  );
};

const makeNodes = ({ hits }: { hits: Array<Object> }) => {
  return (
    <>
      {hits?.map((hit: any, index: React.Key | null | undefined) => (
        <Node hit={hit} key={index} index={index} />
      ))}
    </>
  );
};

export const Composition = () => {
  const { projects } = useSnapshot(cloud);
  const { query } = useSnapshot(cloudSearch);
  const { leftright, frontback } = useSnapshot(cloudComp);
  const [selected, setSelected] = useState<any>([]);
  const hits = useSearch(projects, query);
  const Nodes = useMemo(() => makeNodes({ hits }), [hits, query, projects]);

  return (
    <Canvas
      // dpr={[1, 1.5]}
      className="r3fCanvas"
      gl={{
        physicallyCorrectLights: false,
        preserveDrawingBuffer: true,
      }}
      frameloop={"demand"}
    >
      <Camera />
      <Lights />
      <Physics
        allowSleep={false}
        size={100}
        gravity={[leftright, -9.8, frontback]}
      >
        {/* <Debug color="white" scale={1.1}> */}
        <Suspense fallback={null}>
          <Bounds />
          <Select onChange={setSelected}>{Nodes}</Select>
        </Suspense>
        <Floor />
        {selected[0] ? <Sky /> : <Fog />}
        {/* </Debug> */}
      </Physics>
      <Controls selected={selected} />
    </Canvas>
  );
};
