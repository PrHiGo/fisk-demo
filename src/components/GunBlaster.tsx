import React, { useState, useEffect } from "react";
import { useControls } from "../hooks/useControl";
import { Bullet } from "./Bullet";

export const GunBlaster = () => {
    const [bullets, setBullets] = useState<React.ReactNode[]>([]);
    const [gunRotation, setGunRotation] = useState({ y: 0 });
    const spacePressed = useControls("Space");

    useEffect(() => {
        if (spacePressed) {
            shootBullet();
        }

        const updateGunRotation = (event: MouseEvent) => {
            const { clientX } = event;
            const windowCenterX = window.innerWidth / 2;
            const deltaX = clientX - windowCenterX;
            const sensitivityFactor = 2;
            const rotationY = -(Math.PI * deltaX) / (windowCenterX * sensitivityFactor);

            setGunRotation({ y: rotationY });
        };

        document.addEventListener("mousemove", updateGunRotation);

        return () => {
            document.removeEventListener("mousemove", updateGunRotation);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spacePressed]);

    const shootBullet = () => {
        const bulletOffsetForward = 2;
        const offsetX = Math.sin(gunRotation.y) * bulletOffsetForward;
        const offsetZ = Math.cos(gunRotation.y) * bulletOffsetForward;
        const bulletStartPosition: [number, number, number] = [
            -offsetX,
            0.25,
            9 - offsetZ
        ];

        setBullets([...bullets, <Bullet key={bullets.length} position={bulletStartPosition} rotation={gunRotation.y} />]);
    };


    return (
        <>
            <group position={[0, 0.2, 9]} rotation={[0, gunRotation.y + Math.PI, 0]}>
                <mesh position={[0, 0, 0.5]}>
                    <boxGeometry args={[0.5, 0.5, 2]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </group>

            {bullets}

        </>
    );

};
