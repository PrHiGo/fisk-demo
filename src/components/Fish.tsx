import React, { useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAnimations } from "@react-three/drei";
import FishModel from "../models/angler_low.glb";

export const Fisk = () => {
    const gltf = useLoader(GLTFLoader, FishModel);
    const { scene, animations } = gltf;
    const { ref, actions } = useAnimations(animations, scene);

    useEffect(() => {
        // Kontrollera att 'actions' innehåller de animationer vi förväntar oss och att 'ref' är satt
        if (ref.current && actions) {
            const action = Object.values(actions)[0];
            if (action) {
                action.play();
            }
        }
    }, [actions, ref]);

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={[1, 1, 1]}
            position={[0, 2.5, -5]}
            rotation={[0, 0, 0]} // Rotera modellen 180 grader runt y-axeln
        />
    );
};

