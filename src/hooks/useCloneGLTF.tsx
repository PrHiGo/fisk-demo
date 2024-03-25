import { useRef, useMemo, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { AnimationMixer } from 'three';

export const useCloneGLTF = (modelPath: string) => {
    const gltf = useLoader(GLTFLoader, modelPath);
    const clonedScene = useMemo(() => clone(gltf.scene), [gltf.scene]);
    const mixer = useMemo(() => new AnimationMixer(clonedScene), [clonedScene]);

    const animations = useRef(gltf.animations);

    useEffect(() => {
        animations.current.forEach(clip => {
            const action = mixer.clipAction(clip);
            action.play();
        });

        return () => {
            mixer.stopAllAction();
        };
    }, [mixer]);

    return { clonedScene, mixer };
};

