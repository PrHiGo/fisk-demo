import React, { ReactNode, useState } from "react";
import { Environment, OrbitControls, PerspectiveCamera, } from "@react-three/drei";
import { Suspense } from "react";
import { Ground } from "../components/Ground";
import { Frame } from "../components/Frame";
import { Fish } from "../components/Fish";
import { GunBlaster } from "../components/GunBlaster";

interface SceneProps {
    children?: ReactNode;
}

export const Scene: React.FC<SceneProps> = ({ children }) => {
    const [score, setScore] = useState(0);

    const handleFishHit = () => {
        setScore(score + 10);
    };

    return (
        <Suspense fallback={null}>
            {children}
            <ambientLight intensity={1} />
            <directionalLight
                position={[0, 10, 0]} // Positionen på ljuset, så det lyser på marken från en vinkel
                intensity={1} // Intensiteten på ljuset
                castShadow // Gör så att ljuset kan kasta skuggor
            />
            <Fish />
            <Frame />
            <Ground />
            <GunBlaster />
            <PerspectiveCamera makeDefault position={[0, 20, 0]} />
            <OrbitControls />
        </Suspense>
    );
}





