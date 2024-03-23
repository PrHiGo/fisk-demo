import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from '@react-three/cannon';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { AnimationMixer, Group, AnimationClip } from 'three';
import FishModel from '../models/angler_low.glb';
import { SceneContext } from '../scenes/Scene';

type Direction = -1 | 1;

type FishProps = {
    id: number;
    onCollide: (id: number) => void;
};

export const Fish: React.FC<FishProps> = ({ id, onCollide }) => {
    const { handleFishHit } = useContext(SceneContext);
    const gltf = useLoader(GLTFLoader, FishModel);
    const clonedSceneRef = useRef<Group>(null);
    const mixerRef = useRef<AnimationMixer | null>(null);
    const animations = gltf.animations.map(clip => AnimationClip.parse(AnimationClip.toJSON(clip)));


    const randomX = Math.floor(Math.random() * 21) - 10;
    const randomZ = Math.random() >= 0.5 ? -6 : 6;
    const [movementDirection, setMovementDirection] = useState<Direction>(randomZ >= 0 ? -1 : 1);

    const [ref, api] = useBox(() => ({
        type: 'Dynamic',
        mass: 0,
        position: [randomX, 0, randomZ],
        userData: { name: 'Fish', id },
        onCollide: e => {
            if (e.body.userData.name === 'Bullet') {
                onCollide(id);
                handleFishHit();
            }
            if (e.body.userData.name === 'BoundaryFrame') {
                onCollide(id);
            }
        },
    }));

    // Animation and motion logic
    useEffect(() => {
        const calculateRotation = (direction: Direction): number => {
            return direction === -1 ? Math.PI : 0;
        };
        const rotationY = calculateRotation(movementDirection);
        api.rotation.set(0, rotationY, 0);


        if (clonedSceneRef.current) {
            mixerRef.current = new AnimationMixer(clonedSceneRef.current);
            animations.forEach(clip => {
                const action = mixerRef.current!.clipAction(clip);
                action.play();
            });
        }
        return () => {
            mixerRef.current?.stopAllAction();
        };

    }, [movementDirection, api.rotation, animations]);

    // Fiskjäveln rör på sig här
    useFrame((state, delta) => {
        mixerRef.current?.update(delta);
        api.velocity.set(0, 0, movementDirection);
    });

    return (
        <>
            <group ref={ref as React.MutableRefObject<Group>}>
                <primitive
                    object={clone(gltf.scene)}
                    ref={clonedSceneRef}
                    scale={[1, 1, 1]}
                />
            </group>
        </>
    );
};
