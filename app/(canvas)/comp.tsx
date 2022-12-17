import React, { Suspense, useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Select } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { cloud } from "../../common/state";
import { Floor, Fog, Lights, Sky } from "./comp.utils";
import { Debug, Physics } from "@react-three/cannon";
import { CD, Node } from "./models";
import { Mesh, TOUCH } from "three";
import { useSearch } from "../../common/utils";
import { cloudSearch } from "../components/desktop/navigator/search/search.state";
import { cloudComp } from "./comp.state";
import { useTheme } from "styled-components";

const Camera = () => {
  const { mobile } = useSnapshot(cloud);
  // get the width and height of the canvas
  const { width, height } = useThree((state) => state.size);
  console.log(width, height);
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={!mobile ? [-2, 10, 0] : [0, 2, -10]}
        // far={30}
        near={0.1}
        fov={90}
        aspect={width / height}
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
          ONE: TOUCH.ROTATE,
          TWO: TOUCH.DOLLY_ROTATE,
        }}
        // enablePan={mobile}
        // enableDamping
        // dampingFactor={1.8}
        minPolarAngle={Math.PI / 4}
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

export const Composition = () => {
  const { projects } = useSnapshot(cloud);
  const { query } = useSnapshot(cloudSearch);
  const { leftright, frontback } = useSnapshot(cloudComp);
  const [selected, setSelected] = useState<Array<any>>([]);
  const { ui } = useTheme();
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
      <CD />
      <Floor />
      <Controls selected={selected} />
    </Canvas>
  );
};
