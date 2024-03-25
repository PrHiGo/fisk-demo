import React, { useContext, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { Group } from 'three';
import FishModel from '../models/angler_low.glb';
import { SceneContext } from '../scenes/Scene';
import { useCloneGLTF } from '../hooks/useCloneGLTF';

type Direction = -1 | 1;

type FishProps = {
    id: number;
    onCollide: (id: number) => void;
};

export const Fish: React.FC<FishProps> = React.memo(({ id, onCollide }) => {
    const { handleFishHit } = useContext(SceneContext);
    const { clonedScene, mixer } = useCloneGLTF(FishModel);

    const randomZ = Math.random() >= 0.5 ? -9 : 9;
    const randomX = Math.floor(Math.random() * 37) - 18;
    const [movementDirection] = useState<Direction>(randomZ >= 0 ? -1 : 1);

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

    useEffect(() => {
        const calculateRotation = (direction: Direction): number => direction === -1 ? Math.PI : 0;
        api.rotation.set(0, calculateRotation(movementDirection), 0);
    }, [movementDirection, api.rotation]);

    useFrame((state, delta) => {
        mixer?.update(delta);
        api.velocity.set(0, 0, movementDirection);
    });

    return (
        <group ref={ref as React.MutableRefObject<Group>}>
            <primitive object={clonedScene} scale={[1, 1, 1]} />
        </group>
    );
});

