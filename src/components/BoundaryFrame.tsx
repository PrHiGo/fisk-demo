import React from 'react';
import { useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { Mesh } from 'three';

type BoundaryFrameProps = {
    thickness?: number;
    height?: number;
};

export const BoundaryFrame: React.FC<BoundaryFrameProps> = ({ thickness = 0.3, height = 0.5 }) => {
    const { viewport } = useThree();
    const frameWidth = viewport.width + 2;
    const frameHeight = viewport.height + 2;

    const positions: [number, number, number][] = [
        [0, height / 2, frameHeight / 2 + thickness / 2], // Front
        [0, height / 2, -frameHeight / 2 - thickness / 2], // Back
        [frameWidth / 2 + thickness / 2, height / 2, 0], // Right
        [-frameWidth / 2 - thickness / 2, height / 2, 0], // Left
    ];

    const args: [number, number, number][] = [
        [frameWidth, height, thickness], // Front and Back
        [thickness, height, frameHeight + thickness], // Right and Left
    ];

    type BoundaryPieceProps = {
        position: [number, number, number];
        args: [number, number, number];
    };

    const BoundaryPiece: React.FC<BoundaryPieceProps> = ({ position, args }) => {
        const [ref] = useBox(() => ({
            type: 'Static',
            mass: 1,
            position,
            args,
            userData: { name: "BoundaryFrame" },
        }));
        return (
            <mesh ref={ref as React.MutableRefObject<Mesh>}>
                <boxGeometry args={args} />
                <meshStandardMaterial color="blue" />
            </mesh>
        );
    };

    return (
        <>
            <BoundaryPiece position={positions[0]} args={args[0]} />
            <BoundaryPiece position={positions[1]} args={args[0]} />
            <BoundaryPiece position={positions[2]} args={args[1]} />
            <BoundaryPiece position={positions[3]} args={args[1]} />
        </>
    );
};

