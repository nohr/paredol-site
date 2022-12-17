import React, { useRef } from "react";
import { useTheme } from "styled-components";
import { MeshPhysicalMaterial, Texture } from "three";
import { useFrame } from "@react-three/fiber";
import { CollideEvent, useSphere } from "@react-three/cannon";
import { useSelect, useTexture } from "@react-three/drei";
import { cloudComp } from "./comp.state";
import { useRouter } from "next/navigation";
import { cloud } from "../../common/state";
import { cloudSearch } from "../components/panels/navigator/search/search.state";
import { useSnapshot } from "valtio";

function handleCollision(e: CollideEvent) {
  const { impactVelocity } = e.contact;
  // console.log(name, impactVelocity);
  if (impactVelocity > 4) {
    console.log("collided");
  }
}

export function Node({ ...props }) {
  const { hit, index } = props;
  const { target } = useSnapshot(cloudComp);
  const cover: Texture = useTexture<string>(hit.cover);
  const selected = useSelect();
  const pos = useRef<[number, number, number]>([0, 0, 0]);
  const rad = useRef<[radius: number]>([1.5]);
  const [Ref, api] = useSphere(() => ({
    mass: 0.001,
    onCollide: handleCollision,
    position: [
      Math.floor(Math.random() * -2),
      index + 5,
      Math.floor(Math.random() * -3),
    ],
    args: rad.current,
  })) as any;

  useFrame((_state) => {
    if (Ref.current && selected[0] && selected[0].id === Ref.current.id) {
      // console.log(target);
      console.log(Ref.current);
      rad.current = [1];
      // console.log(api);
      // console.log(state);
      api.scaleOverride([2, 2, 2]);
      // state.camera.zoom = 1 - snap.grabberPosition.x / 300;
      const unsubscribe = api.position.subscribe(
        (v: [number, number, number]) => {
          pos.current = v;
        }
      );
      cloudComp.target = pos.current;
      return unsubscribe;
    } else {
      api.scaleOverride([1, 1, 1]);
      cloudComp.target = [0, 0, 0];
      rad.current = [1.5];
    }
    return null;
  });

  // useFrame(() => {
  //     api.wakeUp();
  //     api.allowSleep.set(false);
  // })

  // Handle preview
  // if (Ref && selected[0] && selected[0].id === Ref.current.id) {
  //   cloud.preview = [hit];
  // }
  // if (!selected[0]) {
  //   cloud.preview = [];
  // }

  const router = useRouter();
  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      ref={Ref}
      onClick={() => {
        if (Ref.current && selected[0] && selected[0].id === Ref.current.id) {
          router.push(`/${hit.lot}`);
          cloudSearch.query = "";
          // confirm();
        } else {
          cloud.project = [hit];
          // select();
        }
      }}
    >
      <sphereGeometry args={[rad.current[0], 40, 40]} />
      <meshPhysicalMaterial
        map={cover}
        reflectivity={1}
        clearcoat={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

export function CD({ ...props }) {
  const cd = useRef<any>();
  // const { mobile } = useSnapshot(cloud);

  function Ball({ ...props }) {
    const { canvas } = useTheme();
    const material = new MeshPhysicalMaterial({
      // wireframe: true,
      color: canvas.cd.color,
      reflectivity: 1,
      roughness: canvas.cd.roughness,
      metalness: 0.2,
      opacity: 1,
      clearcoat: 0.8,
    });

    return (
      <mesh {...props} castShadow receiveShadow material={material}>
        <sphereGeometry args={[220, 50, 50]} />
      </mesh>
    );
  }

  //   useFrame(() => {
  //     if (!mobile) {
  //       if (cd.current) {
  //         let { rotation } = cd.current;
  //         if (rotation) {
  //           console.log(rotation);
  //           //   rotation.x += 0.015;
  //           //   rotation.y += 0.0005;
  //           //   rotation.z += 0.015;
  //         }
  //       } else {
  //         return;
  //       }
  //     }
  //   });

  //   useFrame((state) => {
  //     cd.current && cd.current.lookAt(0, 0, -15);
  //     state.camera.position.lerp(new THREE.Vector3(0, 0, -15), 0.01);
  //   });

  return (
    <group
      ref={cd}
      scale={0.01}
      dispose={null}
      {...props}
      receiveShadow
      castShadow
    >
      <Ball position={[5.28, 0, -265.23]} />
      <Ball position={[306.5, 0, 134.46]} />
      <Ball position={[-296.7, 0, 134.46]} />
    </group>
  );
}
