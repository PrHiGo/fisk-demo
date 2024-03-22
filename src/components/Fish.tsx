import React, { useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBox } from "@react-three/cannon";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { useAnimations } from "@react-three/drei";
import FishModel from "../models/angler_low.glb";
import { Group } from "three";

export const Fish = () => {
    const gltf = useLoader(GLTFLoader, FishModel);
    const { scene, animations } = gltf;
    const { actions } = useAnimations(animations, scene);

    const randomX = Math.floor(Math.random() * 21) - 10;
    const randomZ = Math.random() >= 0.5 ? -6 : 6;
    const rotateFish = randomZ === 6;

    const [ref, api] = useBox(() => ({
        type: 'Dynamic',
        mass: 0,
        position: [randomX, 0, randomZ],
        userData: { name: "Fish" },
    }));

    useEffect(() => {
        if (actions) {
            const action = Object.values(actions)[0];
            if (action) {
                action.play();
            }
        }
    }, [actions]);

    // Fiskjäveln rör på sig här
    useFrame((state, delta) => {
        if (rotateFish) {
            api.velocity.set(0, 0, -1);
        } else {
            api.velocity.set(0, 0, 1);
        }
    });

    return (
        <>
            <group ref={ref as React.MutableRefObject<Group>}>
                <primitive
                    object={clone(gltf.scene)}
                    scale={[1, 1, 1]}
                    rotation={[0, rotateFish ? Math.PI : 0, 0]}
                />
                <mesh>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshBasicMaterial wireframe={true} />
                </mesh>
            </group>
        </>
    );
};
