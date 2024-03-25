import React, { ReactNode, createContext, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Ground } from "../components/Ground";
import { GunBlaster } from "../components/GunBlaster";
import { FishPool } from "../components/FishPool";
import { Html } from '@react-three/drei';
import { BoundaryFrame } from "../components/BoundaryFrame";

interface SceneProps {
    children?: ReactNode;
}

export const SceneContext = createContext<{ handleFishHit: () => void }>({
    handleFishHit: () => { },
});

export const Scene: React.FC<SceneProps> = ({ children }) => {
    const [score, setScore] = useState(0);

    const handleFishHit = () => {
        setScore((currentScore) => currentScore + 10);
    };

    return (
        <>
            <Html>
                <div className="flex gap-2 text-white">
                    <p>Score:</p> <p>{score}</p>
                </div>
            </Html>
            <SceneContext.Provider value={{ handleFishHit }}>
                <Suspense fallback={null}>
                    {children}
                    <ambientLight intensity={1} />
                    <Ground />
                    <BoundaryFrame />
                    <FishPool />
                    <GunBlaster />
                    <PerspectiveCamera makeDefault position={[0, 30, 0]} />
                    <OrbitControls />
                </Suspense>
            </SceneContext.Provider>
        </>
    );
}
