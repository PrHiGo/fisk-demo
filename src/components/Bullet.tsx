import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import React from "react";

export const Bullet = ({ position, rotation }: { position: [number, number, number], rotation: number }) => {

    const [ref, api] = useSphere(() => ({
        type: 'Dynamic',
        mass: 0,
        position,
        userData: { name: "Bullet" },
        onCollide: e => {
            if (e.body?.userData?.name === 'Fish') {
                removeBullet();
            }
            if (e.body?.userData?.name === 'BoundaryFrame') {
                removeBullet();
            }
        },
    }));

    const direction = new Vector3();

    const removeBullet = () => {
        api.position.set(-1000, 0, 0);
        api.velocity.set(0, 0, 0);
    };

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
