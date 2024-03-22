import React, { useEffect, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBox } from "@react-three/cannon";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { AnimationMixer, Group, AnimationClip } from "three";
import FishModel from "../models/angler_low.glb";

export const Fish: React.FC = () => {
    const gltf = useLoader(GLTFLoader, FishModel);
    const clonedSceneRef = useRef<Group>(null);
    const mixerRef = useRef<AnimationMixer | null>(null);

    const animations = gltf.animations.map(clip => AnimationClip.parse(AnimationClip.toJSON(clip)));

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
        if (clonedSceneRef.current) {
            mixerRef.current = new AnimationMixer(clonedSceneRef.current);
            animations.forEach((clip) => {
                const action = mixerRef.current!.clipAction(clip);
                action.play();
            });
        }

        return () => {
            mixerRef.current?.stopAllAction();
        };
    }, [animations]);

    useFrame((_, delta) => {
        mixerRef.current?.update(delta);

        if (rotateFish) {
            api.velocity.set(0, 0, -1);
        } else {
            api.velocity.set(0, 0, 1);
        }
    });

    return (
        <group ref={ref as React.MutableRefObject<Group>}>
            <primitive
                object={clone(gltf.scene)}
                ref={clonedSceneRef}
                scale={[1, 1, 1]}
                rotation={[0, rotateFish ? Math.PI : 0, 0]}
            />
        </group>
    );
};
