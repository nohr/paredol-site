"use client";

import { useSphere } from "@react-three/cannon";
import { useSelect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import { cloudComp } from "./comp.state";

export function Node({ ...props }) {
  const { hit, index } = props;
  // console.log(hit);
  let radius: [radius: number] = [1.5];
  // const snap = useSnapshot(state);
  // const cover = useTexture(hit.cover);
  const { target } = useSnapshot(cloudComp);
  const selected = useSelect();
  const pos = useRef<[number, number, number]>([0, 0, 0]);
  const [Ref, api] = useSphere(() => ({
    mass: 10,
    position: [
      Math.floor(Math.random() * -2),
      index + 5,
      Math.floor(Math.random() * -3),
    ],
    args: radius,
  })) as any;

  useFrame((state) => {
    if (Ref.current && selected[0] && selected[0].id === Ref.current.id) {
      cloudComp.target = pos.current;
      console.log(target, selected[0].id, Ref.current.id);
      radius = [3];
      console.log(api);
      // state.camera.position.lerp(vec.set(xPosition, Position, Position), .01);
      // state.camera.updateProjectionMatrix();
      // state.camera.zoom = 1 - snap.grabberPosition.x / 300;
      const unsubscribe = api.position.subscribe(
        (v: [number, number, number]) => {
          pos.current = v;
        }
      );
      return unsubscribe;
    } else {
      cloudComp.target = [0, 0, 0];
      radius = [1.5];
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

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      ref={Ref}
      onClick={() => {
        if (Ref.current && selected[0] && selected[0].id === Ref.current.id) {
          // setLocation(`${hit.lot}`);
          // cloud.query = "";
          // confirm();
        } else {
          // cloud.preview = [hit];
          // Ref.current.scale.set([1, 1, 1]);
          // select();
        }
      }}
    >
      <sphereGeometry
        args={[
          Ref && selected[0] && selected[0].id === Ref.current.id ? 3 : 1.5,
          40,
          40,
        ]}
      />
      <meshPhysicalMaterial
        // map={cover}
        reflectivity={1}
        clearcoat={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}
