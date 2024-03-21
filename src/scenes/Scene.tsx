import React, { ReactNode } from "react";
import { Environment, OrbitControls, PerspectiveCamera, } from "@react-three/drei";
import { Suspense } from "react";
import { Ground } from "../components/Grounde";
import { Frame } from "../components/Frame";
import { Fisk } from "../components/Fish";

interface SceneProps {
    children?: ReactNode;
}

export const Scene: React.FC<SceneProps> = ({ children }) => {
    return (
        <Suspense fallback={null}>
            {children}
            <directionalLight
                position={[0, 10, -10]} // Positionen på ljuset, så det lyser på marken från en vinkel
                intensity={1} // Intensiteten på ljuset
                castShadow // Gör så att ljuset kan kasta skuggor
            />
            <Fisk />
            <Frame />
            <Ground />
            <PerspectiveCamera makeDefault position={[0, 5, 10]} />
            <OrbitControls />
        </Suspense>
    );
}





