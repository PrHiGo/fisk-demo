import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useContext } from "react";
import { Mesh, Vector3 } from "three";
import { SceneContext } from "../scenes/Scene";

export const Bullet = ({ position, rotation }: { position: [number, number, number], rotation: number }) => {
    const { handleFishHit } = useContext(SceneContext); // Använda kontexten

    const [ref, api] = useSphere(() => ({
        type: 'Kinematic',
        mass: 0,
        position,
        onCollide: (e) => {
            console.log("Kollision detekterad", e.body.userData.name);
            if (e.body.userData.name === "Fish") {
                handleFishHit();

            }
        },
    }));

    const direction = new Vector3();

    useFrame(() => {
        direction.set(-Math.sin(rotation), 0, -Math.cos(rotation)).normalize();
        direction.multiplyScalar(5);
        api.velocity.set(direction.x, direction.y, direction.z);
    });

    return (
        <Sphere ref={ref as React.MutableRefObject<Mesh>} args={[0.1, 64, 64]} position={position}>
            <meshBasicMaterial attach="material" color="red" />
        </Sphere>
    );
};
