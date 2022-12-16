import React, { useRef } from "react";
// import { cloud } from "../../common/state";
import { useTheme } from "styled-components";
import { Mesh, MeshPhysicalMaterial, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { CollideEvent, useSphere } from "@react-three/cannon";
import { useSelect, useTexture } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { cloudComp } from "./comp.state";

function handleCollision(e: CollideEvent) {
  const { impactVelocity } = e.contact;
  // console.log(name, impactVelocity);
  if (impactVelocity > 1) {
    console.log("collided");
  }
}

export function Node({ ...props }) {
  const { hit, index } = props;
  // console.log(hit);
  let radius: [radius: number] = [1.5];
  const cover = useTexture(hit.cover);
  console.log(cover);

  const selected = useSelect();
  const pos = useRef<[number, number, number]>([0, 0, 0]);
  const [Ref, api] = useSphere(() => ({
    mass: 0.01,
    allowSleep: false,
    onCollide: handleCollision,
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
      // console.log(target, selected[0].id, Ref.current.id);
      radius = [3];
      // console.log(api);
      api.wakeUp();
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

  const { canvas } = useTheme();
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
          Ref && selected[0] && selected[0].id === Ref.current?.id ? 3 : 1.5,
          40,
          40,
        ]}
      />
      <meshPhysicalMaterial
        // map={cover}
        color={canvas.cd.color}
        // roughness={canvas.cd.roughness}
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
