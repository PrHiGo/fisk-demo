import React from 'react';
import { usePlane } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import { Mesh } from 'three';

export const Ground = () => {
    const { viewport } = useThree();  // Använd useThree för att få tillgång till viewportens storlek

    const [ref] = usePlane<Mesh>(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        type: 'Static'
    }));

    // Använd viewportens bredd och höjd för att definiera planetens storlek
    // Du kan behöva multiplicera med en skalfaktor beroende på din världs skala.
    const planeWidth = viewport.width;
    const planeHeight = viewport.height;

    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry attach="geometry" args={[planeWidth, planeHeight]} />
            <meshBasicMaterial attach="material" color="darkblue" />
        </mesh>
    );
}
