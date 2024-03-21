import React from 'react';
import { useThree } from '@react-three/fiber';

export const Frame = ({ thickness = 0.3, height = 0.5 }) => {
    const { viewport } = useThree();

    // Använd viewportens bredd och höjd för att definiera ramens storlek
    const frameWidth = viewport.width - 1;
    const frameHeight = viewport.height - 1;

    // Kordinaterna för ramens kanter, skalade baserat på viewport
    const edges = [
        { position: [0, height / 2, frameHeight / 2 + thickness / 2], scale: [frameWidth, height, thickness] }, // Fram
        { position: [0, height / 2, -frameHeight / 2 - thickness / 2], scale: [frameWidth, height, thickness] }, // Bak
        { position: [frameWidth / 2 + thickness / 2, height / 2, 0], scale: [thickness, height, frameHeight + thickness] }, // Höger
        { position: [-frameWidth / 2 - thickness / 2, height / 2, 0], scale: [thickness, height, frameHeight + thickness] }, // Vänster
    ];

    return (
        <>
            {edges.map((edge, i) => (
                <mesh key={i} position={edge.position as [number, number, number]}>
                    <boxGeometry args={edge.scale as [number, number, number]} />
                    <meshStandardMaterial color="black" />
                </mesh>
            ))}
        </>
    );
};
