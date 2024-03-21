import React from 'react';
import { usePlane } from '@react-three/cannon';
import { Mesh } from 'three';


export const Ground = () => {

    const [ref] = usePlane<Mesh>(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        type: 'Static'
    }));

    return (
        <mesh ref={ref} receiveShadow> {/* Gör så att marken kan ta emot skuggor */}
            <planeGeometry attach="geometry" args={[10, 10]} /> {/* Storleken på marken */}
            <meshBasicMaterial attach="material" color="gold" /> {/* Färg eller textur */}
        </mesh>
    );
}