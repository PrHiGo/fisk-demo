import React, { ReactNode } from "react";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
  children?: ReactNode;
}

export const Scene: React.FC<SceneProps> = ({ children }) => {
  return (
    <Suspense fallback={null}>
      {children}

      <PerspectiveCamera makeDefault position={[-6,3.9,6.21]} fov={40}/>
      <OrbitControls />
    </Suspense>
  );
}





