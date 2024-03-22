import React, { useContext, useEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from '@react-three/cannon';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { AnimationMixer, Group, AnimationClip } from 'three';
import FishModel from '../models/angler_low.glb';
import { SceneContext } from '../scenes/Scene';

type FishProps = {
    id: number;
    onCollide: (id: number) => void;
    entryPoint: number; // Lägg till en ny prop för att definiera ingångspunkten
};

// Fördefinierade ingångspunkter och rotationsvinklar
export const entryPoints: { position: [number, number, number]; rotation: number }[] = [
    { position: [-10, 0.25, 0], rotation: 0 }, // Från vänster till höger
    { position: [10, 0.25, 0], rotation: Math.PI }, // Från höger till vänster
    { position: [0, 0.25, -6], rotation: Math.PI / 2 }, // Från botten till toppen
    { position: [0, 0.25, 6], rotation: -Math.PI / 2 }, // Från toppen till botten
];

export const Fish: React.FC<FishProps> = ({ id, onCollide, entryPoint }) => {

    const { handleFishHit } = useContext(SceneContext);
    const gltf = useLoader(GLTFLoader, FishModel);
    const clonedSceneRef = useRef<Group>(null);
    const mixerRef = useRef<AnimationMixer | null>(null);

    // Clone animations to ensure they're unique per instance
    const animations = gltf.animations.map(clip => AnimationClip.parse(AnimationClip.toJSON(clip)));

    // Använd den fördefinierade ingångspunkten och rotationsvinkeln
    const { position, rotation } = entryPoints[entryPoint % entryPoints.length];

    const [ref, api] = useBox(() => ({
        type: 'Dynamic',
        mass: 0,
        position,
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
        if (clonedSceneRef.current) {
            mixerRef.current = new AnimationMixer(clonedSceneRef.current);
            animations.forEach(clip => {
                const action = mixerRef.current!.clipAction(clip);
                action.play();
            });
        }
        const speed = 1; // Justera denna hastighet efter behov
        api.velocity.set(Math.sin(rotation) * speed, 0, Math.cos(rotation) * speed);
        // Cleanup: Stop all actions when component unmounts
        return () => {
            mixerRef.current?.stopAllAction();
        };
    }, [api.velocity, rotation, animations]);

    useFrame((_, delta) => {
        mixerRef.current?.update(delta);
        // Rörelseriktning baserad på fördefinierad rotation
    });

    return (
        <group ref={ref as React.MutableRefObject<Group>}>
            <primitive
                object={clone(gltf.scene)}
                ref={clonedSceneRef}
                scale={[1, 1, 1]}
                rotation={[0, rotation, 0]}
            />
        </group>
    );
};
