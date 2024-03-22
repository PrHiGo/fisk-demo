import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useContext } from "react";
import { Mesh, Vector3 } from "three";

export const Bullet = ({ position, rotation }: { position: [number, number, number], rotation: number }) => {

    const [ref, api] = useSphere(() => ({
        type: 'Dynamic',
        mass: 0,
        position,
        userData: { name: "Bullet" },
    }));

    const direction = new Vector3();

    useFrame(() => {
        direction.set(-Math.sin(rotation), 0, -Math.cos(rotation)).normalize();
        direction.multiplyScalar(5);
        api.velocity.set(direction.x, direction.y, direction.z);
    });

    return (
        <Sphere ref={ref as React.MutableRefObject<Mesh>} args={[0.1, 64, 64]} position={position}>
            <meshBasicMaterial attach="material" color="white" />
        </Sphere>
    );
};
