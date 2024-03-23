import React from 'react';
import { usePlane } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import { Mesh } from 'three';

export const Ground = () => {
    const { viewport } = useThree();  // Använd useThree för att få tillgång till viewportens storlek

    const [ref] = usePlane<Mesh>(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        type: 'Kinematic'
    }));

    // Size with 24 inch 1920 x 1080
    const planeWidth = 39.4;
    const planeHeight = 18.7;

    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry attach="geometry" args={[planeWidth, planeHeight]} />
            <meshBasicMaterial attach="material" color="darkblue" />
        </mesh>
    );
}
