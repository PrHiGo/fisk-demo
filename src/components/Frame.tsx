import React from 'react';

export const Frame = ({ size = 10, thickness = 0.2, height = 0.5 }) => {
    const halfSize = size / 2;

    // Kordinaterna för ramens kanter
    const edges = [
        { position: [0, height / 2, halfSize + thickness / 2], scale: [size, height, thickness], }, // Fram
        { position: [0, height / 2, -halfSize - thickness / 2], scale: [size, height, thickness] }, // Bak
        { position: [halfSize + thickness / 2, height / 2, 0], scale: [thickness, height, size + 0.4] }, // Höger
        { position: [-halfSize - thickness / 2, height / 2, 0], scale: [thickness, height, size + 0.4] }, // Vänster
    ];

    return (
        <>
            {edges.map((edge, i) => (
                <mesh key={i} position={edge.position as [number, number, number]}>
                    <boxGeometry args={edge.scale as [number, number, number]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
            ))}
        </>
    );
};
