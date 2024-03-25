import { useBox } from '@react-three/cannon';
import { Mesh } from 'three';
import React from 'react';

type BoundaryFrameProps = {
    thickness?: number;
    height?: number;
};

export const BoundaryFrame: React.FC<BoundaryFrameProps> = ({ thickness = 0.3, height = 0.5 }) => {

    // Size with 24 inch 1920 x 1080
    const frameWidth = 39.4 + 2;
    const frameHeight = 18.7 + 2;

    const positions: [number, number, number][] = [
        [0, height / 2, frameHeight / 2 + thickness / 2],
        [0, height / 2, -frameHeight / 2 - thickness / 2],
        [frameWidth / 2 + thickness / 2, height / 2, 0],
        [-frameWidth / 2 - thickness / 2, height / 2, 0],
    ];

    const args: [number, number, number][] = [
        [frameWidth, height, thickness],
        [thickness, height, frameHeight + thickness],
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

